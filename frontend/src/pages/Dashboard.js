import React from "react";
import Content from "../components/Content";
import Cell from "../components/Cell";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const apiUrl = "http://localhost:5000/api/";
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(requestData, []);

  function requestData() {
    switch (role) {
      case "admin":
        requestAdminData();
        break;
      case "employee":
        requestEmployeeData();
        break;
      case "employer":
        requserEmployerData();
        break;
      default:
        throwUser();
      //TODO Handle error
    }
  }

  function throwUser() {
    localStorage.clear();
    history.push("/login");
  }

  function requestEmployeeData() {
    axios
      .get(`${apiUrl}employee/${userId}`, { withCredentials: true })
      .then((res) => {
        const task = res.data.map(rel => {
          return rel.tasks.map(task => {
            return {
              text: task.text,
              state: task.state,
              date: task.updatedDate || task.creatingDate,
              id: task._id
            }
          })
        })
        setData(task.flat())
      })
      .catch((err) => {
        // TODO: Alert error
        if (err.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        }
      });
  }

  function requserEmployerData() {}

  function requestAdminData() {}

  return (
    <>
      <Content>
        <ul style={{ listStyle: "none", maxWidth: "70%", flexGrow: "1" }}>
          {data.length > 0
            ? data.map((task) => {
                return (
                  <Link key={task.id} to="/">
                    <Cell>
                      <h3 key={task.id + "text"}>{task.text}</h3>
                      <p key={task.id + "state"}>State: {task.state}</p>
                    </Cell>
                  </Link>
                );
              })
            : "No data"}
        </ul>
        <div style={{ margin: "0 30px" }}>
          <div>
            <h3 style={{ margin: "20px 0 10px 0" }}>Sorted by:</h3>
            <ul style={{ paddingLeft: "40px" }}>
              <li>First name</li>
              <li>Second name</li>
            </ul>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Dashboard;
