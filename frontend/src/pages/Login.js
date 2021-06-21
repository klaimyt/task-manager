import React, { useRef, useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Card from "../components/ui/Card";
import TextForm from "../components/ui/TextForm";
import Button from "../components/ui/Button";
import NavbarContext from "../store/navbar-context";
import requestLogin from "../api/requestLogin";

const Login = () => {
  // Style
  const mainDivStyle = {
    display: "grid",
    placeItems: "center",
    width: "100vw",
    height: "100vh",
  };

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const history = useHistory();
  const navbarCtx = useContext(NavbarContext);

  // Setup navbar
  useEffect(() => {
    navbarCtx.setTitle("Tasks Manager");
  }, []);

  // Handlers
  function submitHandler(event) {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    requestLogin(username, password)
      .then(() => history.push("/"))
      .catch((err) => {
        if (err.response === undefined) {
          setError("Server unvailable");
        } else {
          setError(err.response.data.error);
        }
      });
  }

  // If user already logged in
  if (localStorage.getItem("name")) {
    return <Redirect to="/" />;
  }

  // View components
  return (
    <div style={mainDivStyle}>
      <Card>
        {error ? (
          <h1 style={{ color: "#FF6347", paddingTop: "2rem", margin: "auto" }}>
            {error}
          </h1>
        ) : null}

        <form onSubmit={submitHandler}>
          <TextForm
            inputId="username"
            inputType="text"
            labelText="Username:"
            minLength={5}
            inputRef={usernameRef}
          />
          <TextForm
            inputId="password"
            inputType="password"
            labelText="Password:"
            minLength={8}
            inputRef={passwordRef}
          />
          <Button isLong={true} style={{ marginTop: "2rem" }} text="sign in" />
        </form>
      </Card>
    </div>
  );
};

export default Login;
