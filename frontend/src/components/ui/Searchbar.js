import React from "react";
import TextForm from "./TextForm";

import classes from "./Searchbar.module.css";

const Searchbar = (props) => {
  const isHidden = props.data.length > 0 ? ' ' + classes.opened : ' ' + classes.hidden
  const isOpen = props.data.length > 0 ? ' ' + classes.opened : ""

  return (
    <div className={classes.main + isOpen}>
      <TextForm
        inputId={props.inputId}
        inputType="text"
        labelText={props.labelText}
        autofocus={props.autofocus}
        inputRef={props.inputRef}
        style={{ margin: "0", width: "auto", backgroundColor: "#fff" }}
      />
      <div className={classes.resBox + isHidden}>
        <ul>
          {props.data.map((data) => {
            return (
              <li>
                <span>Name:</span> {data.name}
                <br />
                <span>Username:</span> {data.username}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Searchbar;
