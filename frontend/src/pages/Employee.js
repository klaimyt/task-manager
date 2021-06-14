import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import config from "../config.json";
import NavbarContext from "../store/navbar-context";
import requestEmployeeData from "../api/requestEmployeeData";
import ModalContext from "../store/modal-context";
import SortBox from "../components/ui/SortBox";

const Employee = () => {
  const navbarCtx = useContext(NavbarContext);
  const { isOpen } = useContext(ModalContext);
  const [data, setData] = useState();
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
    if (data && sortMethod) sortMethod(setData);
  }, [sortMethod]);

  useEffect(() => {
    if (isOpen) return;
    const res = requestEmployeeData(employeeId);
    res
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [isOpen]);

  function getNextState(taskId) {
    const [task] = data.filter((task) => task.id === taskId);
    const currentStateIndex = states.indexOf(task.state);
    if (role === "employee") {
      if (currentStateIndex === 2) return states[1];
      // Button should be unclickable on 3 index
      if (currentStateIndex === 3) return null;
    }

    return states[(currentStateIndex + 1) % 4];
  }

  function cellClicked(cell) {
    history.push(`/employee/${employeeId}/${cell.id}`);
  }

  function secondaryButtonClicked(taskId) {
    const state = getNextState(taskId);
    if (!state) return;
    axios
      .patch(
        `${config.API_URL}employee/${employeeId}/${taskId}`,
        { state: state },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setData((prevData) => {
            return prevData.map((task) => {
              if (task.id === taskId) task.state = state;
              return task;
            });
          });
        }
      });
  }

  function createSortBox() {
    const sortItems = [
      { text: "Creation Date", sortMethodName: "creationDate" },
      { text: "Alphabetical A-z", sortMethodName: "alphabetical" },
    ];
    return (
      <SortBox
        header="Sort By:"
        items={sortItems}
        setSortMethod={setSortMethod}
      />
    );
  }

  return (
    <Dashboard
      data={data || [{ text: error, id: "err" }]}
      action={cellClicked}
      secondaryAction={secondaryButtonClicked}
      right={createSortBox()}
    />
  );
};

export default Employee;
