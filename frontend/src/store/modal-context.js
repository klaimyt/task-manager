import { createContext, useState } from 'react'
import CreateNewTask from '../components/Modal/CreateNewTask'

const ModalContext = createContext()

export function ModalContextProvider(props) {
  const [component, setComponent] = useState(<></>)

  const context = {
    createNewTaskHandler: createNewTaskHandler,
    onClose: onClose
  }

  function createNewTaskHandler() {
   setComponent(<CreateNewTask />)
  }

  function onClose() {
    setComponent(null)
  }

  return (
    <ModalContext.Provider value={context}>
      {props.children}
      {component}
    </ModalContext.Provider>
  )
}

export default ModalContext