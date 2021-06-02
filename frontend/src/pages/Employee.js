import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import config from "../config.json";
import NavbarContext from "../store/navbar-context";
import requestEmployeeData from "../api/requestEmployeeData";
import ModalContext from "../store/modal-context";

const Employee = () => {
  const navbarCtx = useContext(NavbarContext);
  const { isOpen } = useContext(ModalContext);
  const [data, setData] = useState(null);
  const { employeeId } = useParams();
  const history = useHistory();
  const states = ["To do", "In progress", "Done", "Finished"];
  const role = localStorage.getItem("role");

  useEffect(() => {
    navbarCtx.setTitle("Tasks");
    if (role === "employer") {
      navbarCtx.setButtons({
        backButton: true,
        logoutButton: true,
        createTaskButton: true,
      });
    } else {
      navbarCtx.setButtons({
        logoutButton: true,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) return;
    const res = requestEmployeeData(employeeId);
    res.then(({ error, data }) => {
      if (error) return console.log(error);
      setData(data);
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

  return (
    <Dashboard
      data={data}
      action={cellClicked}
      secondaryAction={secondaryButtonClicked}
    />
  );
};

export default Employee;
