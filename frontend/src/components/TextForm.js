import React from "react";
import classes from "./TextForm.module.css";

const TextForm = (props) => {
  return (
    <div className={classes['text-form']}>
      <label htmlFor={props.inputId}>{props.labelText}</label>
      <input type={props.inputType} id={props.inputId} />
    </div>
  );
};

export default TextForm;
