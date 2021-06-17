import axios from "axios";
import config from "../config.json";

export default function requsetTask(employeeId, taskId) {
  return axios
    .get(`${config.API_URL}employee/${employeeId}/${taskId}`, {
      withCredentials: true,
    })
    .then((res) => {
      return {
        text: res.data.text,
        state: res.data.state,
        createDate: res.data.creatingDate,
        updateDate: res.data.updatedDate,
      };
    })
    .catch((err) => {
      return {
        text: "Error: " + err.response.status + " " + err.response.statusText,
      };
    });
}
