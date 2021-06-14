import React, { useRef, useState } from "react";
import TextForm from "./TextForm";

import classes from "./Searchbar.module.css";
import useEmployerSearch from "../../hooks/useEmployerSearch";

const Searchbar = (props) => {
  const [dropdownIsOpened, setDropdownIsOpened] = useState(false);
  const [query, setQuery] = useState();
  const textRef = useRef();
  const { data } = useEmployerSearch(query, props.role);

  function handleDropdownClick(user) {
    textRef.current.value = user.name;
    setDropdownIsOpened(false);
    props.getData(user);
  }

  function onChangeHandler(e) {
    setDropdownIsOpened(e.target.value.length > 0 && data.length > 0);
    setQuery(e.target.value);
  }

  function dropdownMenu() {
    if (!dropdownIsOpened) return null;
    return (
      <div className={classes.resBox}>
        <ul>
          {data.map((user) => {
            return (
              <li key={user._id} onClick={() => handleDropdownClick(user)}>
                <span>Name:</span> {user.name}
                <br />
                <span>Username:</span> {user.username}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className={classes.main + " " + (dropdownIsOpened && classes.opened)}>
      <TextForm
        autocomplete={"off"}
        inputId={props.inputId}
        inputType="text"
        labelText={props.labelText}
        autofocus={props.autofocus}
        onchange={onChangeHandler}
        inputRef={textRef}
        style={{ margin: "0", width: "auto", backgroundColor: "#fff" }}
      />
      {dropdownMenu()}
    </div>
  );
};

export default Searchbar;
