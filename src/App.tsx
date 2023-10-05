import React, { useState } from 'react'
import './App.css'
import { TaskType, TodoList } from './Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId]
    let filteredTasks = todolistTasks.filter((t) => t.id !== id)
    tasks[todolistId] = filteredTasks
    setTasks({ ...tasks })
  }

  function addTask(title: string, todolistId: string) {
    let task = {
      id: v1(),
      title: title,
      isDone: false,
    }
    let todolistTasks = tasks[todolistId]
    let newTasks = [task, ...todolistTasks]
    tasks[todolistId] = newTasks
    setTasks({ ...tasks })
  }

  function changeFIlter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId]
    let task = todolistTasks.find(t => t.id === id)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasks })
    }
  }
  function changeTaskTitle(id: string, newTitle: string, todolistId: string
  ) {
    let todolistTasks = tasks[todolistId]
    let task = todolistTasks.find(t => t.id === id)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasks })
    }
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title,
    }
    setTodolists([todolist, ...todolists])
    setTasks({
      ...tasks,
      [todolist.id]: [],
    })
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'active' },
    { id: todolistId2, title: 'What to buy', filter: 'completed' },
  ])

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Water', isDone: true },
    ],
  })

  return (
    <div className='App'>
      <AddItemForm addItem={addTodolist} />
      {todolists.map((tl) => {
        let tasksForTododList = tasks[tl.id]

        if (tl.filter === 'completed') {
          tasksForTododList = tasksForTododList.filter((t) => t.isDone === true)
        }

        if (tl.filter === 'active') {
          tasksForTododList = tasksForTododList.filter(
            (t) => t.isDone === false
          )
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            task={tasksForTododList}
            removeTask={removeTask}
            changeFIlter={changeFIlter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        )
      })}
    </div>
  )
}

export default App
