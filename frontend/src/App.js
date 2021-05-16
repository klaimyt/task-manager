import "./App.css";
import { Route, Switch } from "react-router-dom";
// Routes
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
