import axios from "axios";
import config from "../config.json";

export default function requestLogin(username, password) {
  const authData = {
    username: username,
    password: password,
  };

  return axios
    .post(`${config.API_URL}auth/login`, authData, {
      withCredentials: true,
    })
    .then((res) => {
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("id", res.data.id);
    });
}
