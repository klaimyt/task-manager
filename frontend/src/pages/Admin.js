import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "../components/ui/Dashboard";
import NavbarContext from "../store/navbar-context";
import ModalContext from "../store/modal-context";
import requestAdminData from "../api/requestAdminData";
import SortBox from "../components/ui/SortBox";

const Admin = () => {
  const navbarCtx = useContext(NavbarContext);
  const { isOpen } = useContext(ModalContext);
  const [data, setData] = useState(null);
  // Take a sort function from SortBox component
  const [sortMethod, setSortMethod] = useState();
  const history = useHistory();

  // Setup navbar
  useEffect(() => {
    navbarCtx.setTitle("All Users");
    navbarCtx.setButtons({
      logoutButton: true,
      createNewUser: true,
      createNewRelationship: true,
    });
  }, []);

  //  Request data each time when modal close
  useEffect(() => {
    if (!isOpen) {
      requestAdminData().then((resData) => {
        if (sortMethod) {
          sortMethod(setData, resData);
        } else {
          setData(resData);
        }
      });
    }
  }, [isOpen]);

  // Sort data when sorting method changes
  useEffect(() => {
    if (data && sortMethod) sortMethod(setData);
  }, [sortMethod]);

  // Handlers
  function cellClickedHandler(cell) {
    const userRole = cell.secondaryText.split(" ");
    switch (userRole[userRole.length - 1]) {
      case "employee":
        history.push(`/employee/${cell.id}`);
        return;
      case "employer":
        history.push(`/employer/${cell.id}`);
        return;
      default:
        return;
    }
  }

  // View Components
  function createRightComponent() {
    const sortItems = [
      { text: "Role", sortMethodName: "role" },
      { text: "Name", sortMethodName: "alphabetical" },
    ];
    return (
      <SortBox
        header="Sort By:"
        items={sortItems}
        setSortMethod={setSortMethod}
      />
    );
  }

  return (
    <Dashboard
      data={data}
      right={createRightComponent()}
      action={cellClickedHandler}
    />
  );
};

export default Admin;
