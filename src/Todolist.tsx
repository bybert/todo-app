import React from 'react'
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
}

export function TodoList(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.task.map((t, index) => (
          <li key={index}>
            <input type='checkbox' checked={t.isDone} />
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id)
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFIlter('all')
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFIlter('active')
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFIlter('completed')
          }}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
