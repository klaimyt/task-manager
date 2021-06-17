import React, { useRef, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from './Modal'
import TextAreaForm from '../ui/TextAreaForm'
import createTask from '../../api/CreateTask'
import Button from '../ui/Button'
import ModalContext from '../../store/modal-context'
import Loading from 'react-spinner-material'

const CreateNewTask = () => {
  const modalCtx = useContext(ModalContext)
  const [isSubmited, setIsSubmited] = useState(false)
  const newTaskTextArea = useRef()
  const location = useLocation()

  function onSubmitHandler(event) {
    event.preventDefault()
    if (isSubmited) return

    const taskText = newTaskTextArea.current.value
    const currentPath = location.pathname
    const employeeId = currentPath.split('/')

    createTask(employeeId[employeeId.length - 1], taskText).then(() => 
      modalCtx.onClose()
    )
    setIsSubmited(true)
  }

  return (
    <Modal onClose={modalCtx.onClose}>
      <form onSubmit={onSubmitHandler}>
        <TextAreaForm labelText='New task: ' inputId='newTaskForm' inputRef={newTaskTextArea} />
        {isSubmited ? <Loading /> : <Button isLong={true} text='Create' />}
        <Button text='Cancel' onClick={() => modalCtx.onClose()} />
      </form>
    </Modal>
  )
}

export default CreateNewTask
