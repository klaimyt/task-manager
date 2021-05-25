import React from "react";

const Backdrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: 1,
      }}
    />
  );
};

export default Backdrop;