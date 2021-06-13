import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "../components/ui/Dashboard";
import NavbarContext from "../store/navbar-context";
import ModalContext from "../store/modal-context";
import requestAdminData from "../api/requestAdminData";
import Filter from "../components/ui/Filter";

const Admin = () => {
  const navbarCtx = useContext(NavbarContext);
  const [data, setData] = useState(null);
  const [sortList, setSortList] = useState([{text: "Role", selected: true}, {text: "Name", selected: false}])
  const { isOpen } = useContext(ModalContext);
  const history = useHistory();

  useEffect(() => {
    navbarCtx.setTitle("All Users");
    navbarCtx.setButtons({ logoutButton: true, createNewUser: true, createNewRelationship: true });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      requestAdminData().then((data) => {
        setData(data);
      });
    }
  }, [isOpen]);

  // Filter
  useEffect(() => {
    const [currentFilter] = sortList.filter(item => item.selected)
    if (currentFilter.text === "Role" && data) {
      setData(prevData => {
        return prevData.sort((a, b) => {
          if (a.secondaryText.toLowerCase() === b.secondaryText.toLowerCase()) return 0
          return a.secondaryText.toLowerCase() < b.secondaryText.toLowerCase() ? -1 : 1 
        }).slice()
      })
    }

    if (currentFilter.text === "Name" && data) {
      setData(prevData => {
        return prevData.sort((a, b) => {
          if (a.text.toLowerCase() < b.text.toLowerCase()) return -1
          if (a.text.toLowerCase() > b.text.toLowerCase()) return 1
          return 0
        }).slice()
      })
    }
  }, [sortList])

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

  function createFilterComponent() {
    function filterHandler(e) {
      // Get filter state
      const filterText = e.target.outerText
      // Change filter
      setSortList(prevData => {
        return (
          prevData.map(item => {
            if (item.selected) item.selected = false
            if (item.text === filterText) item.selected = true
            return item
          })
        )
      })
    }

    return (
    <Filter header='Sorted by: ' items={sortList} filterHandler={filterHandler} />
    )
  }

  return <Dashboard data={data} right={createFilterComponent()} action={cellClickedHandler} />;
};

export default Admin;
