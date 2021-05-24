import React from "react";
import classes from "./Cell.module.css";
import Button from "./Button";

const Cell = ({ text, id, button, secondaryText, children, ...rest }) => {
  const [state, action] = button || [null, null];

  function styleToState(state) {
    switch (state) {
      case "To do":
        return "#e74c3c";
      case "In progress":
        return "#f39c12";
      case "Done":
        return "#1abc9c";
      case "Finished":
        return "#2ecc71";
    }
  }

  const SecondaryField = () => {
    if (button) {
      return (
        <Button
          text={state}
          style={{
            backgroundColor: styleToState(state),
            color: "white",
          }}
          onClick={(event) => {
            event.stopPropagation()
            action(id)
           }}
        />
      );
    } else {
      return <p>{secondaryText}</p>
    }
  }

  return (
    <li>
      <div {...rest} className={classes.cell}>
        <h3>{text}</h3>
        <SecondaryField />
        {children}
      </div>
    </li>
  );
};

export default Cell;
