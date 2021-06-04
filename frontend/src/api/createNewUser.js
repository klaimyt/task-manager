import axios from "axios";
import config from "../config.json";

export default function createNewUser(user) {
  return axios.post(`${config.API_URL}admin/createUser`, user, {
    withCredentials: true,
  })
}
