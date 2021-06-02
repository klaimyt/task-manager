import axios from "axios";
import config from "../config.json";

export default async function requestEmployeeData(employeeId) {
  let error = null
  let data = null

  await axios.get(
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
    data = Array.from(tasks.flat());
  }).catch(err => {
    error = `Oooops, something went wrong... Error: ${err}`;
  })

  return {data, error}
}
