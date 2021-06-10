import axios from "axios";
import config from "../config.json";

export default function createTask(userId, taskText) {
  return axios.post(
    `${config.API_URL}employee/${userId}`,
    { text: taskText },
    { withCredentials: true }
  );
}
