import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import config from "../config.json";
import NavbarContext from "../store/navbar-context";

const Employer = () => {
  const navbarCtx = useContext(NavbarContext);
  const { employerId } = useParams();
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const role = localStorage.getItem('role')
    requstData();
    navbarCtx.setTitle("Employees");
    if (role === 'admin') {
      navbarCtx.setButtons({ logoutButton: true ,backButton: true, changePasswordButton: true })
    } else {
      navbarCtx.setButtons({ logoutButton: true });
    }
  }, []);

  function requstData() {
    axios
      .get(`${config.API_URL}employer/${employerId}`, { withCredentials: true })
      .then((res) => {
        const employees = res.data.map((userData) => {
          return {
            text: userData.employeeId.name,
            secondaryText: "Tasks: " + userData.tasks.length,
            id: userData.employeeId._id,
          };
        });
        setData(employees);
      })
      .catch((err) => {
        //TODO error handler
      });
  }

  function clickHandler(cell) {
    history.push(`/employee/${cell.id}`);
  }

  return <Dashboard data={data} action={clickHandler} />;
};

export default Employer;
