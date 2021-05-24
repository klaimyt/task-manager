import React, { useContext } from "react";
import { Power, ArrowLeftCircleFill, Back } from "react-bootstrap-icons";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import NavElement from "./NavElement";
import NavButton from "./NavButton";
import NavbarContext from "../../store/navbar-context";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const navbarCtx = useContext(NavbarContext);

  const title = navbarCtx.title;
  const buttons = navbarCtx.buttons;

  const history = useHistory();
  const location = useLocation();
  const role = localStorage.getItem("role");

  function handleLogout() {
    axios
      .delete("http://localhost:5000/api/auth/login", { withCredentials: true })
      .then(() => {
        // TODO err handl
        localStorage.clear();
        history.push("/login");
      });
  }

  function getTitle() {
    switch (location.pathname) {
      case "/login":
        return "Tasks Manager";
      case "/":
        switch (role) {
          case "employer":
            return "Employees";
          case "employee":
            return "Tasks";
        }
      default:
        break;
    }
  }

  if (location.pathname === "/login") {
    return (
      <div className={classes["nav-bar"]}>
        <NavElement>
          <h2 style={{ padding: "0.5rem" }}>{"text"}</h2>
        </NavElement>
      </div>
    );
  }

  function logoutButton() {
    if (buttons.logoutButton) {
      return (
        <NavButton onClick={handleLogout}>
          <Power style={{ color: "#fff", fontSize: "1.5rem" }} />
          <h2>Log out</h2>
        </NavButton>
      );
    }
  }

  function backButton() {
    if (buttons.backButton) {
      return (
        <NavButton onClick={() => history.goBack()}>
          <ArrowLeftCircleFill style={{ color: "#fff", fontSize: "1.5rem" }} />
          <h2>Back</h2>
        </NavButton>
      );
    }
  }

  return (
    <div className={classes["nav-bar"]}>
      <NavElement>{backButton()}</NavElement>
      <NavElement>
        <h2>{title}</h2>
      </NavElement>
      <NavElement>{logoutButton()}</NavElement>
    </div>
  );
};

export default Navbar;
