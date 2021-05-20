import "./App.css";
import { Route, Switch } from "react-router-dom";
// import { useState, useEffect } from "react";
// Routes
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './layout/Navbar/Navbar'

function App() {
  function checkAuth() {
      const user = localStorage.getItem('username')
      return user ? true : false 
  }

  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <ProtectedRoute path="/" exact component={Dashboard} isAuth={checkAuth} />
      </Switch>
    </div>
  );
}

export default App;
