import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingAnimation from "react-spinner-material";
// Routes
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      history.push("/login");
    }
    setLoading(false);
  }, [history]);

  return (
    <div className="app">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <LoadingAnimation radius={80} />
        </div>
      ) : (
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      )}
    </div>
  );
}

export default App;
