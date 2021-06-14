import axios from "axios";
import config from "../config.json";

export default function requestEmployeeData(employerId) {
  return axios
    .get(`${config.API_URL}employer/${employerId}`, {
      withCredentials: true,
    })
    .then((res) => {
      const employees = res.data.map((rel) => {
        return {
          text: rel.employeeId.name,
          secondaryText: "Tasks: " + rel.tasks.length,
          date: rel.creatingDate,
          id: rel.employeeId._id,
        };
      });
      return employees;
    });
}
