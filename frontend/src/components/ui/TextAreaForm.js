import React from "react";
import classes from "./TextAreaForm.module.css";

const TextAreaForm = (props) => {
  return (
    <div className={classes["text-form"]}>
      <label htmlFor={props.inputId}>{props.labelText}</label>
      <textarea id={props.inputId} rows="5" required ref={props.inputRef} />
    </div>
  );
};

export default TextAreaForm;
