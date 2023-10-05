import { ChangeEvent } from 'react'
import { FilterValuesType } from './App'
import './App.css'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { IconButton, Button, Checkbox } from '@mui/material'
import { Delete } from '@mui/icons-material'

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
       <IconButton onClick={removeTodolist} aria-label="delete"><Delete/></IconButton>
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
              <Checkbox
                color='secondary'
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan 
                title={t.title} 
                onChange={onChangeTitleHandler} />
              <IconButton onClick={removeHandler} aria-label="delete"><Delete/></IconButton>
            </li>
          )
        })}
      </ul>
      <div>
        <Button 
          color={'inherit'}
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          Queue
        </Button>
        <Button 
          color={'primary'}
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Development
        </Button>
        <Button
          color={'secondary'}
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Done
        </Button>
      </div>
    </div>
  )
}
