import React, { useRef, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../ui/Modal";
import TextForm from "../ui/TextForm";
import changePassword from "../../api/changePassword";
import Button from "../ui/Button";
import ModalContext from "../../store/modal-context";

const ChangePassword = () => {
  const modalCtx = useContext(ModalContext);
  const [error, setError] = useState(null);
  const newPassword = useRef();
  const repeatPassword = useRef();
  const location = useLocation();

  function onSubmitHandler(event) {
    event.preventDefault();
    const newPasswordText = newPassword.current.value;
    const repeatPasswordText = repeatPassword.current.value;
    const currentPath = location.pathname;
    const userId = currentPath.split("/");

    if (newPasswordText === repeatPasswordText) {
      changePassword(userId[userId.length - 1], newPasswordText).then(() =>
        modalCtx.onClose()
      ).catch(err => {
        setError("Ooops... Server error: " + err.response.data.error)
      })
    } else {
      // TODO Error handler
      setError("Passwords not match");
    }
  }

  return (
    <Modal onClose={modalCtx.onClose}>
      <form onSubmit={onSubmitHandler}>
        {error && <h3 style={{ color: "#FF6347 " }}>{error}</h3>}
        <TextForm
          autofocus='true'
          inputId="password"
          labelText="New Password: "
          inputType="password"
          minLength={8}
          inputRef={newPassword}
        />
        <TextForm
          inputId="repeat-password"
          labelText="Repeat Password: "
          inputType="password"
          minLength={8}
          inputRef={repeatPassword}
        />
        <Button isLong={true} text="Change" />
        <Button text="Cancel" onClick={() => modalCtx.onClose()} />
      </form>
    </Modal>
  );
};

export default ChangePassword;
