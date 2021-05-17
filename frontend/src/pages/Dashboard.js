import React from "react";
import Navbar from "../layout/Navbar";
import Content from "../components/Content";
import Cell from "../components/Cell";

const Dashboard = () => {
  const tasks = [];
  for (let i = 0; i < 50; i++) {
    tasks.push({
      text: "Hello lorem ipsum gun change task random words create login register user data task id and again  fdsgewrgergergerhrtjhnrtjhnrthreth",
      count: i,
    });
  }

  return (
    <>
      <Navbar />
      <Content>
        <ul style={{ listStyle: "none", maxWidth: "70%", flexGrow: "1" }}>
          {tasks.map((task) => {
            return (
              <Cell>
                <h3>{task.text}</h3>
                <p>Tasks: {task.count}</p>
              </Cell>
            );
          })}
          <Cell>
            <h3>Hello</h3>
            <p>Tasks: 5</p>
          </Cell>
          <Cell>
            <h3>Goodbye and test random words</h3>
            <p>Tasks: 10</p>
          </Cell>
        </ul>
        <div style={{ margin: "0 30px" }}>
          <div>
            <h3 style={{ margin: "20px 0 10px 0" }}>Sorted by:</h3>
            <ul style={{ paddingLeft: "40px" }}>
              <li>First name</li>
              <li>Second name</li>
            </ul>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Dashboard;
