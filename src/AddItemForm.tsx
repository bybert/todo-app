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
      setError('Tile is required')
    }
  }

  return (
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
  )
}
