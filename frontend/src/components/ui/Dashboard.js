import React from "react";
import Content from "./Content";
import SideBlock from "./SideBlock";
import Cell from "./Cell";
import Loading from "react-spinner-material";

const Dashboard = (props) => {
  if (!props.data) {
    return (
      <Content>
        <SideBlock />
        <Loading />
        <SideBlock />
      </Content>
    );
  }

  return (
    <Content>
      <SideBlock>{props.left}</SideBlock>
      <ul style={{ listStyle: "none", flexGrow: "2" }}>
        {props.data.map((task) => {
          return (
            <Cell
              key={task.id}
              id={task.id}
              text={task.text}
              button={task.state ? [task.state, props.secondaryAction] : null}
              secondaryText={task.secondaryText}
              onClick={() => {
                props.action(task)}}
            />
          );
        })}
      </ul>
      <SideBlock>{props.right}</SideBlock>
    </Content>
  );
};

export default Dashboard;
