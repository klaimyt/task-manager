import axios from "axios";
import config from "../config.json";

export default async function requestEmployeeData(employeeId) {
  return await axios.get(
    `${config.API_URL}employee/${employeeId}`,
    {
      withCredentials: true,
    }
  ).then(res => {
    const tasks = res.data.map((rel) => {
      return rel.tasks.map((task) => {
        return {
          text: task.text,
          state: task.state,
          date: task.updatedDate || task.creatingDate,
          id: task._id,
        };
      });
    }); 
    const a = Array.from(tasks.flat());
    return a
  })
}
