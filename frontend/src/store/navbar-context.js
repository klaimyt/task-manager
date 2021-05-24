import { createContext, useState } from 'react'

const NavbarContext = createContext({
  buttons: {
    backButton: false,
    logoutButton: false
  },
  title: '',
  setTitle: (title) => {},
  setButtons: ({backButton, logoutButton}) => {}
})

export function NavbarContextProvider(props) {
  const [buttons, setButtons] = useState({})
  const [title, setTitle] = useState('')

  const context = {
    buttons: buttons,
    title: title,
    setTitle: titleHandler,
    setButtons: buttonsHandler
  }

  function titleHandler(newTitle) {
    setTitle(newTitle)
  }

  function buttonsHandler(buttons) {
    setButtons(buttons)
  }

  return (
    <NavbarContext.Provider value={context}>
      {props.children}
    </NavbarContext.Provider>
  )
}

export default NavbarContext