import React from "react";

const MainBlock = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        flexBasis: "0px",
        flexGrow: "3",
        textAlign: "center",
        border: "1px solid #f4f4f4",
        borderRadius: "30px",
        background: "#fff",
        padding: '1rem 2rem',
        alignItems: 'center'
      }}
    >
      {children}
    </div>
  );
};

export default MainBlock;
