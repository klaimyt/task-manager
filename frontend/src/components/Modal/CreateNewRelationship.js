import React, { useContext, useState } from "react";
import ModalContext from "../../store/modal-context";
import Button from "../ui/Button";
import Modal from "./Modal";
import Searchbar from "../ui/Searchbar";

const CreateNewRelationship = () => {
  const modalCtx = useContext(ModalContext);
  const [error, setError] = useState();
  const [searchData, setSearchData] = useState({ employer: "", employee: "" });

  function onSubmitHandler(e) {
    e.preventDefault();

    
  }

  return (
    <Modal onClose={modalCtx.onClose}>
      {error && <h3 style={{ color: "#FF6347 " }}>{error}</h3>}
      <form onSubmit={onSubmitHandler}>
        <Searchbar
          getResult={(e) =>
            setSearchData((p) => {
              return { ...p, employer: e._id };
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
          getResult={(e) =>
            setSearchData((p) => {
              return { ...p, employee: e._id };
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
