import React from "react";
import Card from "../components/ui/Card";
import TextForm from "../components/ui/TextForm";
import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  function submitHandler(event) {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      username: username,
      password: password,
    };

    sendRequest(userData)
      .then((res) => {
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("id", res.data.id);
        history.push("/");
      })
      .catch((err) => {
        if (err.response === undefined) {
          setError("Server unvailable");
        } else {
          setError(err.response.data.error);
        }
      });
  }

  function sendRequest(userData) {
    return axios.post("http://localhost:5000/api/auth/login", userData, {
      withCredentials: true,
    });
  }

  return (
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
        <button className="btn-long mr-h-3">SIGN IN</button>
      </form>
    </Card>
  );
};

export default Login;
