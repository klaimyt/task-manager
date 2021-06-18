import ReactDom from "react-dom";
import Backdrop from "../ui/Backdrop";
import Card from "../ui/Card";

const Modal = (props) => {
  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 15,
    overflow: 'auto'
  }

  return ReactDom.createPortal(
    <div style={style}>
      <div style={{display: 'grid', placeItems: 'center', width: '100%', height: '100%'}}>
        <Card>{props.children}</Card>
      </div>
      <Backdrop onClick={props.onClose} />
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
