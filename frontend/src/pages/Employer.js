import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import config from '../config.json'

const Employer = () => {
  const { employerId } = useParams();
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(requstData, [])

  function requstData() {
    axios
      .get(`${config.API_URL}employer/${employerId}`, { withCredentials: true })
      .then((res) => {
        const employees = res.data.map((userData) => {
          return {
            text: userData.employeeId.name,
            secondaryText: userData.tasks.length,
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
    history.push(`/employee/${cell.id}`)
  }

  return <Dashboard data={data} action={clickHandler} />;
};

export default Employer;
