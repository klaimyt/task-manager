import React from 'react'

const NavElement = ({children}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', flexGrow: '1', justifyContent: 'center', flexBasis: '0'}}>
      {children}
    </div>
  )
}

export default NavElement
