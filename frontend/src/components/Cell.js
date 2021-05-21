import React from "react";
import classes from "./Cell.module.css";

const Cell = ({ children, ...rest }) => {
  return (
    <li>
      <div {...rest} className={classes.cell}>
        {children}
      </div>
    </li>
  );
};

export default Cell;
