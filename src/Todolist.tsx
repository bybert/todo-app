import { ChangeEvent } from 'react'
import { FilterValuesType } from './App'
import './App.css'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type PropsType = {
  id: string
  title: string
  task: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskId: string, todolistId: string) => void
  changeFIlter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {
  const onAllClickHandler = () => props.changeFIlter('all', props.id)
  const onActiveClickHandler = () => props.changeFIlter('active', props.id)
  const onCompletedClickHandler = () =>
    props.changeFIlter('completed', props.id)
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
       <button onClick={removeTodolist}>x</button>{' '}
      </h3>
      <div>
        <AddItemForm addItem={addTask} />
      </div>
      <ul>
        {props.task.map((t) => {
          const removeHandler = () => {
            props.removeTask(t.id, props.id)
          }
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
          }

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan 
                title={t.title} 
                onChange={onChangeTitleHandler} />
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
