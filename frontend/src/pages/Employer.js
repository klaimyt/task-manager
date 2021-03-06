import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../components/ui/Dashboard";
import { useParams, useHistory } from "react-router-dom";
import NavbarContext from "../store/navbar-context";
import requestEmployerData from "../api/requestEmployerData";
import SortBox from "../components/ui/SortBox";

const Employer = () => {
  const navbarCtx = useContext(NavbarContext);
  const { employerId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // Take a sort function from SortBox component
  const [sortMethod, setSortMethod] = useState();
  const history = useHistory();

  // Setup navbar
  useEffect(() => {
    const role = localStorage.getItem("role");
    navbarCtx.setTitle("Employees");
    if (role === "admin") {
      navbarCtx.setButtons({
        logoutButton: true,
        backButton: true,
        changePasswordButton: true,
      });
    } else {
      navbarCtx.setButtons({ logoutButton: true });
    }
  }, []);

  // Request data from server
  useEffect(() => {
    requestEmployerData(employerId)
      .then((employees) => {
        setData(employees);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, []);

  // Sort data when sorting method changes
  useEffect(() => {
    if (data && sortMethod) sortMethod(setData);
  }, [sortMethod]);

  // Handlers
  function clickHandler(cell) {
    // Will not click if cell has speciall id (0, err)
    if (cell.id === "0" || cell.id === "err") return;
    history.push(`/employee/${cell.id}`);
  }

  // View Components
  function createSortBox() {
    const sortItems = [
      { text: "Name", sortMethodName: "alphabetical" },
      { text: "Creation Date", sortMethodName: "creationDate" },
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
      data={data || (error && [{ text: error, id: "err" }])}
      right={createSortBox()}
      action={clickHandler}
    />
  );
};

export default Employer;
