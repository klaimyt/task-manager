import React from "react";
import Card from "../Card";
import TextForm from "../TextForm";
import axios from 'axios'
import { useState } from "react";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitHandler(event) {
    event.preventDefault();
    sendRequest();
  }

  function usernameHandler(e) {
    setUsername(e.target.value);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  const userData = {
    username: username,
    password: password,
  };

  function sendRequest() {;
    axios.post('http://localhost:5000/api/auth/login', userData, {withCredentials: true})
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <TextForm
          inputId="username"
          inputType="text"
          labelText="Username:"
          inputHandler={usernameHandler}
          inputValue={username}
          minLength={5}
        />
        <TextForm
          inputId="password"
          inputType="password"
          labelText="Password:"
          inputHandler={passwordHandler}
          inputValue={password}
          minLength={8}
        />
        <button className="btn-long mr-h-3">SIGN IN</button>
      </form>
    </Card>
  );
};

export default Registration;
