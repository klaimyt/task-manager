import React, { useRef, useContext } from 'react'
import Modal from '../ui/Modal'
import TextAreaForm from '../ui/TextAreaForm'
import CreateTask from '../../api/CreateTask'
import Button from '../ui/Button'
import ModalContext from '../../store/modal-context'

const CreateNewTask = () => {
  const modalCtx = useContext(ModalContext)
  const newTaskTextArea = useRef()

  function onSubmitHandler(event) {
    event.preventDefault()
    const taskText = newTaskTextArea.current.value

    CreateTask('userId', taskText)
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
