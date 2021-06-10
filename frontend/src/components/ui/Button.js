import React from "react";
import classes from "./Button.module.css";

const Button = ({ isLong, text, ...rest }) => {
  return (
    <button {...rest} className={classes[isLong ? "btn-long" : null]}>{text}</button>
  );
};

export default Button;
