import React, { useContext } from "react";
import {
  Power,
  ArrowLeftCircleFill,
  ClipboardPlus,
  Key,
  PersonPlus,
  People,
} from "react-bootstrap-icons";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import NavElement from "./NavElement";
import NavButton from "./NavButton";
import NavbarContext from "../../store/navbar-context";
import ModalContext from '../../store/modal-context'

import classes from "./Navbar.module.css";

const Navbar = () => {
  const navbarCtx = useContext(NavbarContext);
  const modalCtx = useContext(ModalContext)
  const title = navbarCtx.title;
  const buttons = navbarCtx.buttons;
  const history = useHistory();
  const location = useLocation();

  // Api req
  function handleLogout() {
    axios
      .delete("http://localhost:5000/api/auth/login", { withCredentials: true })
      .then(() => {
        // TODO err handl
        localStorage.clear();
        history.push("/login");
      });
  }

  // Handlers
  function onMouseEnterHandler(e) {
    const elements = e.target.children;
    for (const element of elements) {
      if (element.tagName === "H2") {
        const length = element.textContent.length;
        element.style.width = `${length * 0.55}rem`;
        return;
      }
    }
  }

  function onMouseLeaveHandler(e) {
    const elements = e.target.children;
    for (const element of elements) {
      if (element.tagName === "H2") {
        element.style.width = "0";
        return;
      }
    }
  }

  // Buttons
  function logoutButton() {
    if (buttons.logoutButton) {
      return (
        <NavButton
          onClick={handleLogout}
          onMouseEnter={(e) => {
            onMouseEnterHandler(e);
          }}
          onMouseLeave={(e) => {
            onMouseLeaveHandler(e);
          }}
        >
          <Power style={{ color: "#fff", fontSize: "1.5rem" }} />
          <h2>Log out</h2>
        </NavButton>
      );
    }
  }

  function backButton() {
    if (buttons.backButton) {
      return (
        <NavButton
          onClick={() => history.goBack()}
          onMouseEnter={(e) => {
            onMouseEnterHandler(e);
          }}
          onMouseLeave={(e) => {
            onMouseLeaveHandler(e);
          }}
        >
          <ArrowLeftCircleFill style={{ color: "#fff", fontSize: "1.5rem" }} />
          <h2>Back</h2>
        </NavButton>
      );
    }
  }

  function createTaskButton() {
    if (buttons.createTaskButton) {
      return (
        <NavButton
          onMouseEnter={(e) => {
            onMouseEnterHandler(e);
          }}
          onMouseLeave={(e) => {
            onMouseLeaveHandler(e);
          }}
          onClick={modalCtx.createNewTaskHandler}
        >
          <ClipboardPlus style={{ color: "#fff", fontSize: "1.5rem" }} />
          <h2>New Task</h2>
        </NavButton>
      );
    }
  }

  function changePasswordButton() {
    if (buttons.changePasswordButton) {
      return (
        <NavButton onMouseEnter={(e) => {
          onMouseEnterHandler(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveHandler(e);
        }}
        onClick={modalCtx.changePasswordHandler}
        >
          <Key style={{ color: "#fff", fontSize: "1.5rem" }} />
          <h2>Password</h2>
        </NavButton>
      )
    }
  }

  function createNewUser() {
    if (buttons.createNewUser) {
      return (
        <NavButton onMouseEnter={(e) => {
          onMouseEnterHandler(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveHandler(e);
        }}
        onClick={modalCtx.createNewUserHandler}
        >
          <PersonPlus style={{ color: "#fff", fontSize: "1.5rem" }} />
          <h2>New User</h2>
        </NavButton>
      )
    }
  }

  function createNewRelationship() {
    if (buttons.createNewRelationship) {
      return (
        <NavButton onMouseEnter={(e) => {
          onMouseEnterHandler(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveHandler(e);
        }}
        onClick={modalCtx.createNewRelationship}
        >
          <People style={{ color: "#fff", fontSize: "1.5rem" }} />
          <h2>New Relationship</h2>
        </NavButton>
      )
    }
  }

  // Component
  if (location.pathname === "/login") {
    return (
      <div className={classes["nav-bar"]}>
        <NavElement>
          <h2 style={{ padding: "0.5rem" }}>{title}</h2>
        </NavElement>
      </div>
    );
  }

  return (
    <div className={classes["nav-bar"]}>
      <NavElement>
        {backButton()}
        {createNewUser()}
        {createNewRelationship()}
      </NavElement>
      <NavElement>
        <h2>{title}</h2>
      </NavElement>
      <NavElement>
        {changePasswordButton()}
        {createTaskButton()}
        {logoutButton()}
      </NavElement>
    </div>
  );
};

export default Navbar;
