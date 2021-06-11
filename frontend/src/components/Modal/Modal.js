import ReactDom from "react-dom";
import Backdrop from "../ui/Backdrop";
import Card from "../ui/Card";

const Modal = (props) => {
  const scrollbarStyle = {
    overflowY: "scroll"
  };

  return ReactDom.createPortal(
    <>
      <Card
        style={{
          zIndex: 100,
          position: "fixed",
          left: "25%",
          top: "3rem",
          margin: "0",
          width: "50%",
          maxWidth: "50%",
        }}
      >
        <div style={scrollbarStyle}>{props.children}</div>
      </Card>
      <Backdrop onClick={props.onClose} />
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
