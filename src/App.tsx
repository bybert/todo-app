import React, { useState } from 'react'
import './App.css'
import { TodoList } from './Todolist'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ])
  let [filter, setFilter] = useState<FilterValuesType>('all')

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id)
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeFIlter(value: FilterValuesType) {
    setFilter(value)
  }

  let tasksForTododList = tasks
  if (filter === 'completed') {
    tasksForTododList = tasks.filter((t) => t.isDone === true)
  }

  if (filter === 'active') {
    tasksForTododList = tasks.filter((t) => t.isDone === false)
  }

  return (
    <div className='App'>
      <TodoList
        title='What to learn'
        task={tasksForTododList}
        removeTask={removeTask}
        changeFIlter={changeFIlter}
        addTask={addTask}
      />
    </div>
  )
}

export default App
