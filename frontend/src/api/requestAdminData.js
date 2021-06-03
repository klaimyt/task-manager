import axios from "axios";
import config from "../config.json";

export default async function requestAdminData() {
  const response = await axios
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

  return response;
}
