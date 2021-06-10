import React, { useContext, useState } from "react";
import ModalContext from "../../store/modal-context";
import Button from "../ui/Button";
import Modal from "./Modal";
import Searchbar from "../ui/Searchbar";
import createNewRelationship from "../../api/createNewRelationship";

const CreateNewRelationship = () => {
  const modalCtx = useContext(ModalContext);
  const [error, setError] = useState();
  const [newRelationship, setNewRelationship] = useState({
    employerId: "",
    employeeId: "",
  });

  function onSubmitHandler(e) {
    e.preventDefault();

    createNewRelationship(newRelationship)
      .then(() => modalCtx.onClose())
      .catch((err) => {
        setError("Ooops... Server error: " + err.response.data.error);
      });
  }

  return (
    <Modal onClose={modalCtx.onClose}>
      {error && <h3 style={{ color: "#FF6347 " }}>{error}</h3>}
      <form onSubmit={onSubmitHandler}>
        <Searchbar
          getData={(employer) =>
            setNewRelationship((prevData) => {
              return { ...prevData, employerId: employer._id };
            })
          }
          labelText="Employer: "
          inputId="empr-srch"
          role="employer"
          autofocus={true}
        />
        <Searchbar
          inputId="emple-srch"
          labelText="Employee: "
          role="employee"
          getData={(employee) =>
            setNewRelationship((prevData) => {
              return { ...prevData, employeeId: employee._id };
            })
          }
        />
        <Button isLong={true} text="Create" />
        <Button text="Cancel" onClick={modalCtx.onClose} />
      </form>
    </Modal>
  );
};

export default CreateNewRelationship;
