import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import NavbarContext from "../store/navbar-context";
import requestEmployerData from '../api/requestEmployerData'

const Employer = () => {
  const navbarCtx = useContext(NavbarContext);
  const { employerId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null)
  const history = useHistory();

  useEffect(() => {
    const role = localStorage.getItem('role')
    navbarCtx.setTitle("Employees");
    if (role === 'admin') {
      navbarCtx.setButtons({ logoutButton: true ,backButton: true, changePasswordButton: true })
    } else {
      navbarCtx.setButtons({ logoutButton: true });
    }
  }, []);

  useEffect(() => {
    requestEmployerData(employerId).then(employees => {
      if (employees.length > 0) {
        setData(employees)
      } else {
        setData([{text: "You have no employees", id: '0'}])
      }
    }).catch(err => {
      setError(err.response.data)
    })
  }, [])

  function clickHandler(cell) {
    history.push(`/employee/${cell.id}`);
  }

  return <Dashboard data={data || [{text: error, id: 'err'}]} action={clickHandler} />;
};

export default Employer;
