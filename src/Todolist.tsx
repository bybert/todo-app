import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './App.css'
import { FilterValuesType } from './App'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type PropsType = {
  title: string
  task: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFIlter: (value: FilterValuesType) => void
  addTask: (title: string) => void
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle((prevState) => e?.target?.value || prevState)
  }
  const onKeyPressChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
    }
  }
  const addTask = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle('')
  }
  const onAllClickHandler = () => props.changeFIlter('all')
  const onActiveClickHandler = () => props.changeFIlter('active')
  const onCompletedClickHandler = () => props.changeFIlter('completed')

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressChangeHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.task.map((t) => {
          const removeHandler = () => {
            props.removeTask(t.id)
          }
          return (
            <li key={t.id}>
              <input type='checkbox' checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={removeHandler}>x</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}
