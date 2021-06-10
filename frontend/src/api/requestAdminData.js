import axios from "axios";
import config from "../config.json";

export default function requestAdminData() {
  return axios
    .get(`${config.API_URL}admin/`, {
      withCredentials: true,
    })
    .then((res) => {
      const data = res.data.map((user) => {
        return {
          id: user._id,
          text: user.name,
          secondaryText: "Role: " + user.role,
        };
      });
      return data;
    });
}
