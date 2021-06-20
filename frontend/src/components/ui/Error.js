import React from "react";

import classes from "./Error.module.css";

const Error = ({emoji, title, secondaryTitle, text}) => {
  return (
    <div className={classes.main}>
      <div className={classes.emoji}>
        <h1>{emoji}</h1>
      </div>
      <div className={classes.info}>
        <h1>{title}</h1>
        <h2>{secondaryTitle}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Error;
