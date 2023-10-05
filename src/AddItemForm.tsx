import { AddBox } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      if (newTaskTitle.trim() !== '') {
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle('')
      }
    }
  }

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <TextField
        label='Type value'
        variant='outlined'
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressChangeHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={'primary'} size='large'>
        <AddBox />
      </IconButton>
    </div>
  )
}
