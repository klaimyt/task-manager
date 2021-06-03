import axios from "axios";
import config from "../config.json";

export default async function changePassword(userId, newPassword) {
  const error = null
  
  await axios.patch(
    `${config.API_URL}admin/${userId}/changePassword`,
    { password: newPassword },
    { withCredentials: true }
  )

  return { error }
}
