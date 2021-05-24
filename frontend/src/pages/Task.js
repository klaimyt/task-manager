import axios from "axios";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Content from "../components/ui/Content";
import MainBlock from "../components/ui/MainBlock";
import SideBlock from "../components/ui/SideBlock";
import config from "../config.json";
import Loading from "react-spinner-material";

const Task = () => {
  const [data, setData] = useState(null);
  const { employeeId, taskId } = useParams();

  useEffect(() => {
    requsetTask();
  }, []);

  function requsetTask() {
    axios
      .get(`${config.API_URL}employee/${employeeId}/${taskId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData({
          text: res.data.text,
          state: res.data.state,
          createDate: res.data.creatingDate,
          updateDate: res.data.updatedDate,
        });
      })
      .catch((err) => {
        setData({
          text: "Error: " + err.response.status + " " + err.response.statusText,
        });
      });
  }

  if (!data) {
    return (
      <Content>
        <MainBlock>
          <div style={{ margin: "0 auto" }}>
            <Loading />
          </div>
        </MainBlock>
      </Content>
    );
  }

  return (
    <Content>
      <SideBlock></SideBlock>
      <MainBlock>
        <p>{data.text}</p>
      </MainBlock>
      <SideBlock>
        <ul style={{ listStyleType: "none", margin: "0 2rem" }}>
          <li>Created: {new Date(data.createDate).toLocaleDateString()}</li>
          {data.updateDate ? (
            <li>Updated: {new Date(data.updateDate).toLocaleDateString()}</li>
          ) : null}
          <li>State: {data.state}</li>
        </ul>
      </SideBlock>
    </Content>
  );
};

export default Task;
