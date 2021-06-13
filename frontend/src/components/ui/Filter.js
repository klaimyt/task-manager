import React from "react";
import classes from "./Filter.module.css";

const Filter = ({ header, items, filterHandler }) => {
  return (
    <div className={classes.main}>
      <h3>{header}</h3>
      <ul className={classes.filterList}>
        {items &&
          items.map((item) => {
            return (
              <li
                key={item.text}
                className={item.selected ? classes.selected : undefined}
              >
                <span onClick={filterHandler}>{item.text}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Filter;
