import axios from "axios";
import config from "../config.json";

export default function createNewRelationship(newRelationship) {
  return axios.post(`${config.API_URL}admin/relationship`, newRelationship, {
    withCredentials: true,
  });
}
