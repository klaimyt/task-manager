import React from 'react'
import classes from './NavButton.module.css'

const NavButton = ({children, onClick, ...rest}) => {
  return (
    <div {...rest} className={classes.div} onClick={onClick}>
      {children}
    </div>
  )
}

export default NavButton
