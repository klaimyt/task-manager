import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Content from "../components/ui/Content";
import MainBlock from "../components/ui/MainBlock";
import SideBlock from "../components/ui/SideBlock";
import Loading from "react-spinner-material";
import NavbarContext from "../store/navbar-context";
import requsetTask from "../api/requestTask";

const Task = () => {
  const [data, setData] = useState(null);
  const { employeeId, taskId } = useParams();
  const navbarCtx = useContext(NavbarContext);

  useEffect(() => {
    // Request data from server
    requsetTask(employeeId, taskId)
      .then((task) => {
        setData(task);
      })
      .catch((err) => setData(err));

    // Setup Navbar
    navbarCtx.setTitle("Task");
    navbarCtx.setButtons({
      backButton: true,
      logoutButton: true,
    });
  }, []);

  // View Components
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
