import React from "react";
import Card from "../components/ui/Card";
import TextForm from "../components/ui/TextForm";
import axios from "axios";
import { useRef } from "react";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  function submitHandler(event) {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      username: username,
      password: password,
    };

    sendRequest(userData);
  }

  function sendRequest(userData) {
    axios.post("http://localhost:5000/api/auth/login", userData, {
      withCredentials: true,
    });
  }

  return (
    <Card>
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
