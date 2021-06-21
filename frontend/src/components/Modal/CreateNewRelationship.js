import React, { useContext, useState } from "react";
import ModalContext from "../../store/modal-context";
import Button from "../ui/Button";
import Modal from "./Modal";
import Searchbar from "../ui/Searchbar";
import createNewRelationship from "../../api/createNewRelationship";
import Loading from 'react-spinner-material'

const CreateNewRelationship = () => {
  const modalCtx = useContext(ModalContext);
  const [error, setError] = useState();
  const [isSubmited, setIsSubmited] = useState(false);
  // Buffer for data from searchComponent
  const [newRelationship, setNewRelationship] = useState({
    employerId: "",
    employeeId: "",
  });

  function onSubmitHandler(e) {
    e.preventDefault();
    if (isSubmited) return;

    // Send request to server
    createNewRelationship(newRelationship)
      .then(() => modalCtx.onClose())
      .catch((err) => {
        setError("Ooops... Server error: " + err.response.data.error);
      });
    setIsSubmited(true);
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
        {isSubmited ? <Loading /> : <Button isLong={true} text="Create" />}
        <Button text="Cancel" onClick={modalCtx.onClose} />
      </form>
    </Modal>
  );
};

export default CreateNewRelationship;
