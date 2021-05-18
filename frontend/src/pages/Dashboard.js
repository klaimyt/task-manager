import React from "react";
import Navbar from "../layout/Navbar";
import Content from "../components/Content";
import Cell from "../components/Cell";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const apiUrl = "http://localhost:5000/api/";
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");
  const [data, setData] = useState([]);

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
      //default:
      //TODO Handle error
    }
  }

  function requestEmployeeData() {
    axios
      .get(`${apiUrl}employee/${userId}`, { withCredentials: true })
      .then((res) => {
        const arraysOfTasks = res.data.map(relationships => {
          return relationships.tasks
        })
        console.log(arraysOfTasks)
        setData(arraysOfTasks.flat())
      })
      .catch((err) => console.log(err)); // TODO handle error
  }

  function requserEmployerData() {}

  function requestAdminData() {}

  return (
    <>
      <Navbar />
      <Content>
        <ul style={{ listStyle: "none", maxWidth: "70%", flexGrow: "1" }}>
          {data.length > 0
            ? data.map((task) => {
                return (
                  <Link key={task._id} to="/">
                    <Cell>
                      <h3 key={task._id+'text'}>{task.text}</h3>
                      <p key={task._id+'state'}>State: {task.state}</p>
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
