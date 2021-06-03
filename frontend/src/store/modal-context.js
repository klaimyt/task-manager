import { createContext, useState } from 'react'
import CreateNewTask from '../components/Modal/CreateNewTask'
import ChangePassword from '../components/Modal/ChangePassword'

const ModalContext = createContext()

export function ModalContextProvider(props) {
  const [component, setComponent] = useState(<></>)
  const [isOpen, setIsOpen] = useState(false)

  const context = {
    createNewTaskHandler: createNewTaskHandler,
    changePasswordHandler: changePasswordHandler,
    onClose: onClose,
    isOpen: isOpen
  }

  function createNewTaskHandler() {
   setComponent(<CreateNewTask />)
   setIsOpen(true)
  }

  function changePasswordHandler() {
    setComponent(<ChangePassword />)
    setIsOpen(true)
  }

  function onClose() {
    setComponent(null)
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={context}>
      {props.children}
      {component}
    </ModalContext.Provider>
  )
}

export default ModalContext