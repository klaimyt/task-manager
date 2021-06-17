import axios from "axios";
import config from '../config.json'

export default function patchTask(employeeId, taskId, state) {
  return axios
    .patch(
      `${config.API_URL}employee/${employeeId}/${taskId}`,
      { state: state },
      { withCredentials: true }
    )
}
