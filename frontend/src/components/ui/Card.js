import React from "react";

import classes from "./Card.module.css";

const Card = ({children, ...rest}) => {
  return (
    <div {...rest} className={classes.card}>
      {children}
    </div>
  );
};

export default Card;
