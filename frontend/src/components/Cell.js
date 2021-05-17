import React from "react";
import classes from "./Cell.module.css";

const Cell = ({ children }) => {
  return (
    <li>
      <div className={classes.cell}>
        {children}
      </div>
    </li>
  );
};

export default Cell;
