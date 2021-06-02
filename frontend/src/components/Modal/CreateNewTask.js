import React, { useRef, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '../ui/Modal'
import TextAreaForm from '../ui/TextAreaForm'
import createTask from '../../api/CreateTask'
import Button from '../ui/Button'
import ModalContext from '../../store/modal-context'

const CreateNewTask = () => {
  const modalCtx = useContext(ModalContext)
  const newTaskTextArea = useRef()
  const location = useLocation()

  function onSubmitHandler(event) {
    event.preventDefault()
    const taskText = newTaskTextArea.current.value
    const currentPath = location.pathname
    const employeeId = currentPath.split('/')

    createTask(employeeId[employeeId.length - 1], taskText)
    modalCtx.onClose()
  }

  return (
    <Modal onClose={modalCtx.onClose}>
      <form onSubmit={onSubmitHandler}>
        <TextAreaForm labelText='New task: ' inputId='newTaskForm' inputRef={newTaskTextArea} />
        <Button isLong={true} text='Create' />
        <Button text='Cancel' onClick={() => modalCtx.onClose()} />
      </form>
    </Modal>
  )
}

export default CreateNewTask
