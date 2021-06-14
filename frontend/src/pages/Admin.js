import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "../components/ui/Dashboard";
import NavbarContext from "../store/navbar-context";
import ModalContext from "../store/modal-context";
import requestAdminData from "../api/requestAdminData";
import SortBox from "../components/ui/SortBox";

const Admin = () => {
  const navbarCtx = useContext(NavbarContext);
  const [data, setData] = useState(null);
  const { isOpen } = useContext(ModalContext);
  const history = useHistory();
  const [sortMethod, setSortMethod] = useState();

  useEffect(() => {
    navbarCtx.setTitle("All Users");
    navbarCtx.setButtons({
      logoutButton: true,
      createNewUser: true,
      createNewRelationship: true,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      requestAdminData().then((data) => {
        setData(data);
      });
    }
  }, [isOpen]);

  // TODO: Fix initial sort
  useEffect(() => {
    if (data && sortMethod) sortMethod(setData);
  }, [sortMethod]);

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

  function createRightComponent() {
    const sortItems = [
      { text: "Role", sortMethodName: 'role' },
      { text: "Name", sortMethodName: 'alphabetical' },
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
