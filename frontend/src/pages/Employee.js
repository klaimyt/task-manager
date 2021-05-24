import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import config from "../config.json";

const Employee = () => {
  const { employeeId } = useParams();
  const [data, setData] = useState([]);
  const history = useHistory();
  const states = ["To do", "In progress", "Done", "Finished"];
  const role = localStorage.getItem("role");

  useEffect(requstData, []);

  function requstData() {
    axios
      .get(`${config.API_URL}employee/${employeeId}`, { withCredentials: true })
      .then((res) => {
        const task = res.data.map((rel) => {
          return rel.tasks.map((task) => {
            return {
              text: task.text,
              state: task.state,
              date: task.updatedDate || task.creatingDate,
              id: task._id,
            };
          });
        });
        setData(task.flat());
      })
      .catch((err) => {
        //TODO error handler
      });
  }

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
