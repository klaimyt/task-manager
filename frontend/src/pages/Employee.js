import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import NavbarContext from "../store/navbar-context";
import requestEmployeeData from "../api/requestEmployeeData";
import ModalContext from "../store/modal-context";
import SortBox from "../components/ui/SortBox";
import Select from "../components/ui/Select";
import patchTask from "../api/patchTask";

const Employee = () => {
  const navbarCtx = useContext(NavbarContext);
  const { isOpen } = useContext(ModalContext);
  const [data, setData] = useState();
  const [viewData, setViewData] = useState();
  const [error, setError] = useState();
  const [sortMethod, setSortMethod] = useState();
  const { employeeId } = useParams();
  const history = useHistory();
  const states = ["To do", "In progress", "Done", "Finished"];
  const role = localStorage.getItem("role");

  useEffect(() => {
    navbarCtx.setTitle("Tasks");
    switch (role) {
      case "admin":
        navbarCtx.setButtons({
          backButton: true,
          logoutButton: true,
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

  // TODO: Fix initial sort
  useEffect(() => {
    if (viewData && sortMethod) sortMethod(setViewData);
  }, [sortMethod]);

  useEffect(() => {
    // Request new data on modal close
    if (isOpen) return;
    requestEmployeeData(employeeId)
      .then((employeeData) => {
        setViewData(employeeData);
        setData(employeeData);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  }, [isOpen]);

  function getNextState(taskId) {
    const [task] = viewData.filter((task) => task.id === taskId);
    const currentStateIndex = states.indexOf(task.state);
    if (role === "employee") {
      if (currentStateIndex === 2) return states[1];
      // Button should be unclickable on 3 index
      if (currentStateIndex === 3) return null;
    }
    // Admin can't change task state
    if (role === 'admin') return null

    return states[(currentStateIndex + 1) % 4];
  }

  function cellClicked(cell) {
    // Will not click if cell has speciall id (0, err)
    if (cell.id === "0" || cell.id === "err") return;
    history.push(`/employee/${employeeId}/${cell.id}`);
  }

  function secondaryButtonClicked(taskId) {
    const state = getNextState(taskId);
    if (!state) return;
    patchTask(employeeId, taskId, state).then(() => {
      setViewData((prevData) => {
        return prevData.map((task) => {
          if (task.id === taskId) task.state = state;
          return task;
        });
      });
    });
  }

  // Right components
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
      if (!Array.isArray(data)) return;
      const choosenState = e.target.value;

      if (choosenState === "All") {
        setViewData(data);
      } else {
        setViewData(data.filter((task) => task.state === choosenState));
      }
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

  return (
    <Dashboard
      data={viewData || (error && [{ text: error, id: "err" }])}
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
