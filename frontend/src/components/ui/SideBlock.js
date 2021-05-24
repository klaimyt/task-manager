import React from "react";

const SideBlock = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        flexBasis: "0px",
        flexGrow: "1",
        justifyContent: "start",
      }}
    >
      {children}
    </div>
  );
};

export default SideBlock;
