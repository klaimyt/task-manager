import React, { useContext, useRef, useState } from "react";
import ModalContext from "../../store/modal-context";
import Button from "../ui/Button";
import Modal from "./Modal";
import TextForm from "../ui/TextForm";
import Select from "../ui/Select";
import createNewUser from "../../api/createNewUser";
import Loading from 'react-spinner-material'

const CreateNewUser = () => {
  const modalCtx = useContext(ModalContext);
  const [error, setError] = useState();
  const [isSubmited, setIsSubmited] = useState(false);

  const nameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const repPasswordRef = useRef();
  const roleRef = useRef();

  function onSubmitHandler(e) {
    e.preventDefault();
    if (isSubmited) return;

    const nameText = nameRef.current.value;
    const userNameText = userNameRef.current.value;
    const passwordText = passwordRef.current.value;
    const repPasswordText = repPasswordRef.current.value;
    const choosenRole = roleRef.current.value;

    if (passwordText === repPasswordText) {
      const user = {
        name: nameText,
        username: userNameText,
        password: passwordText,
        role: choosenRole,
      };
      createNewUser(user)
        .then(() => modalCtx.onClose())
        .catch((err) => {
          setError("Ooops... Server error: " + err.response.data.error);
        });
      setIsSubmited(true);
    } else {
      setError("Password not match");
    }
  }

  return (
    <Modal onClose={modalCtx.onClose}>
      {error && <h3 style={{ color: "#FF6347 " }}>{error}</h3>}
      <form onSubmit={onSubmitHandler}>
        <TextForm
          inputId="name"
          inputType="text"
          labelText="Name: "
          autofocus={true}
          inputRef={nameRef}
        />
        <TextForm
          inputId="username"
          inputType="text"
          labelText="Username: "
          inputRef={userNameRef}
          minLength={5}
        />
        <Select inputId="role" labelText="User Role: " inputRef={roleRef}>
          <option value="admin">Admin</option>
          <option value="employer">Employer</option>
          <option value="employee">Employee</option>
        </Select>
        <TextForm
          inputId="password"
          inputType="password"
          labelText="Password: "
          inputRef={passwordRef}
          minLength={8}
        />
        <TextForm
          inputId="repPassword"
          inputType="password"
          labelText="Repeat Password: "
          inputRef={repPasswordRef}
          minLength={8}
        />
        {isSubmited ? <Loading /> : <Button isLong={true} text="Create" />}
        <Button text="Cancel" onClick={modalCtx.onClose} />
      </form>
    </Modal>
  );
};

export default CreateNewUser;
