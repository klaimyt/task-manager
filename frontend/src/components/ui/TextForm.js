import React from "react";
import classes from "./TextForm.module.css";

const TextForm = (props) => {
  return (
    <div className={classes["text-form"]} style={props.style}>
      <label htmlFor={props.inputId}>{props.labelText}</label>
      <input
        onBlur={props.onblur}
        autoComplete={props.autocomplete}
        onChange={props.onchange}
        autoFocus={props.autofocus}
        type={props.inputType}
        id={props.inputId}
        ref={props.inputRef}
        required
        minLength={props.minLength}
      />
    </div>
  );
};

export default TextForm;
