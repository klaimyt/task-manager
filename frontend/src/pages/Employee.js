import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import NavbarContext from "../store/navbar-context";
import requestEmployeeData from "../api/requestEmployeeData";
import ModalContext from "../store/modal-context";
import SortBox from "../components/ui/SortBox";
import Select from "../components/ui/Select";
import patchTask from "../api/patchTask";
import Error from "../components/ui/Error";

const Employee = () => {
  const navbarCtx = useContext(NavbarContext);
  const { isOpen } = useContext(ModalContext);
  // dataBuffer contains data from server response
  const [dataBuffer, setDataBuffer] = useState();
  // viewData contains modified (e.g. filtered) data from dataBuffer
  const [viewData, setViewData] = useState();
  const [error, setError] = useState();
  // Take a sort function from SortBox component
  const [sortMethod, setSortMethod] = useState();
  const [filter, setFilter] = useState("All");
  const { employeeId } = useParams();
  const history = useHistory();
  const states = ["To do", "In progress", "Done", "Finished"];
  const role = localStorage.getItem("role");

  // Setup navbar
  useEffect(() => {
    navbarCtx.setTitle("Tasks");
    switch (role) {
      case "admin":
        navbarCtx.setButtons({
          backButton: true,
          logoutButton: true,
          changePasswordButton: true,
        });
        return;
      case "employer":
        navbarCtx.setButtons({
          backButton: true,
          logoutButton: true,
          createTaskButton: true,
        });
        return;
      case "employee":
        navbarCtx.setButtons({
          logoutButton: true,
        });
      default:
        break;
    }
  }, []);

  // Sort data when sorting method changes
  useEffect(() => {
    if (dataBuffer && sortMethod) sortMethod(setDataBuffer);
  }, [sortMethod]);

  // Filter data when filter state or data itself changes
  useEffect(() => {
    if (!dataBuffer) return;
    if (filter === "All") {
      setViewData(dataBuffer);
    } else {
      setViewData(dataBuffer.filter((task) => task.state === filter));
    }
  }, [dataBuffer, filter]);

  //  Request data each time when modal close
  useEffect(() => {
    // Request new data on modal close
    if (isOpen) return;
    requestEmployeeData(employeeId)
      .then((employeeData) => {
        if (sortMethod) {
          sortMethod(setDataBuffer, employeeData);
        } else {
          setDataBuffer(employeeData);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError(
            <Error
              emoji="😔"
              title="404"
              secondaryTitle="Oooops..."
              text="The Relationship you are looking for does not exist. If you sure, that page address absolutly right, please contact to Admin."
            />
          );
        } else {
          setError(
            <Error
              emoji="😔"
              title={err.response.status}
              secondaryTitle="Oooops..."
              text={`Something went wrong. Try to reload page or contact administrator. Error message: ${err.response.data.error}`}
            />
          )
        }
      });
  }, [isOpen]);

  // returns new state for task
  function getNextState(taskId) {
    const [task] = viewData.filter((task) => task.id === taskId);
    const currentStateIndex = states.indexOf(task.state);
    if (role === "employee") {
      if (currentStateIndex === 2) return states[1];
      // Button should be unclickable on 3 index
      if (currentStateIndex === 3) return null;
    }
    // Admin can't change task state
    if (role === "admin") return null;

    return states[(currentStateIndex + 1) % 4];
  }

  // Handlers
  function cellClicked(cell) {
    // Will not click if cell has speciall id (0, err)
    if (cell.id === "0" || cell.id === "err") return;
    history.push(`/employee/${employeeId}/${cell.id}`);
  }

  function secondaryButtonClicked(taskId) {
    const state = getNextState(taskId);
    if (!state) return;
    // Send patch request to server
    patchTask(employeeId, taskId, state).then(() => {
      setViewData((prevData) => {
        return prevData.map((task) => {
          if (task.id === taskId) task.state = state;
          return task;
        });
      });
    });
  }

  // View Components
  function createSortBox() {
    const sortItems = [
      { text: "Creation Date", sortMethodName: "creationDate" },
      { text: "Alphabetical A-z", sortMethodName: "alphabetical" },
    ];
    return (
      <SortBox
        style={{ margin: "0 auto", textAlign: "left", width: "80%" }}
        header="Sort By:"
        items={sortItems}
        setSortMethod={setSortMethod}
      />
    );
  }

  function createFilterBox() {
    function changeStateHandler(e) {
      if (!Array.isArray(dataBuffer)) return;
      const choosenState = e.target.value;
      setFilter(choosenState);
    }

    return (
      <Select
        onChange={changeStateHandler}
        inputId="state"
        labelText="Filter By: "
      >
        <option value="All">All</option>
        <option value="To do">To do</option>
        <option value="In progress">In Progress</option>
        <option value="Done">Done</option>
        <option value="Finished">Finished</option>
      </Select>
    );
  }

  return error ? (
    error
  ) : (
    <Dashboard
      data={viewData}
      action={cellClicked}
      secondaryAction={secondaryButtonClicked}
      right={
        <>
          {createSortBox()}
          {createFilterBox()}
        </>
      }
    />
  );
};

export default Employee;
