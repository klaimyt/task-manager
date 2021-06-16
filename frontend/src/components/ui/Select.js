import React from 'react'

import classes from './Select.module.css'

const Select = (props) => {
  return (
    <div className={classes.select}>
      <label htmlFor={props.inputId}>{props.labelText}</label>
      <select onChange={props.onChange} id={props.inputId} ref={props.inputRef}>
        {props.children}
      </select>
    </div>
  )
}

export default Select
