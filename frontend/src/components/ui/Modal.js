import ReactDom from "react-dom";
import Backdrop from "./Backdrop";
import Card from "./Card";

const Modal = (props) => {
  return ReactDom.createPortal(
    <>
      <Card
        style={{
          zIndex: 2,
          position: "fixed",
          left: "25%",
          top: '3rem',
          margin: '0',
          width: "50%",
          maxWidth: "50%",
        }}
      >
        {props.children}
      </Card>
      <Backdrop onClick={props.onClose} />
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
