import React from "react";
import classes from "./TextForm.module.css";

const TextForm = (props) => {
  return (
    <div className={classes['text-form']}>
      <label htmlFor={props.inputId}>{props.labelText}</label>
      <input type={props.inputType} id={props.inputId} ref={props.inputRef} required minLength={props.minLength}/>
    </div>
  );
};

export default TextForm;
