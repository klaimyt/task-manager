import ReactDom from "react-dom";
import Backdrop from "../ui/Backdrop";
import Card from "../ui/Card";

const Modal = (props) => {
  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh'
  }

  return ReactDom.createPortal(
    <div style={style}>
      <Card>{props.children}</Card>
      <Backdrop onClick={props.onClose} />
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
