import axios from "axios";
import config from "../config.json";

export default function changePassword(userId, newPassword) {
  return axios.patch(
    `${config.API_URL}admin/${userId}/changePassword`,
    { password: newPassword },
    { withCredentials: true }
  )
}
