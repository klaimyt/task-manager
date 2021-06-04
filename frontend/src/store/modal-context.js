import { createContext, useState } from 'react'
import CreateNewTask from '../components/Modal/CreateNewTask'
import ChangePassword from '../components/Modal/ChangePassword'
import CreateNewUser from '../components/Modal/CreateNewUser'

const ModalContext = createContext()

export function ModalContextProvider(props) {
  const [component, setComponent] = useState(<></>)
  const [isOpen, setIsOpen] = useState(false)

  const context = {
    createNewTaskHandler: createNewTaskHandler,
    changePasswordHandler: changePasswordHandler,
    createNewUserHandler: createNewUserHandler,
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

  function createNewUserHandler() {
    setComponent(<CreateNewUser />)
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