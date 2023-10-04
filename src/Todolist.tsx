import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './App.css'
import { FilterValuesType } from './App'
// import { error } from 'console'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type PropsType = {
  id: string
  title: string
  task: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFIlter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export function TodoList(props: PropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim(), props.id)
      setNewTaskTitle('')
    } else {
      setError('Tile is required')
    }
  }

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      if (newTaskTitle.trim() !== '') {
        props.addTask(newTaskTitle.trim(), props.id)
        setNewTaskTitle('')
      }
    }
  }

  const onAllClickHandler = () => props.changeFIlter('all', props.id)
  const onActiveClickHandler = () => props.changeFIlter('active', props.id)
  const onCompletedClickHandler = () =>
    props.changeFIlter('completed', props.id)
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  return (
    <div>
      <h3>{props.title} <button onClick={removeTodolist}>x</button> </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressChangeHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
      <ul>
        {props.task.map((t) => {
          const removeHandler = () => {
            props.removeTask(t.id, props.id)
          }
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <span>{t.title}</span>
              <button onClick={removeHandler}>x</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
