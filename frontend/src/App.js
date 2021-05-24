import "./App.css";
import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
// Routes
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './layout/Navbar/Navbar'
import Task from './pages/Task'
import Admin from './pages/Admin'
import Employer from './pages/Employer'
import Employee from './pages/Employee'
import { NavbarContextProvider } from './store/navbar-context'

function App() {
  function checkAuth() {
      const user = localStorage.getItem('username')
      return user ? true : false 
  }

  function redirect() {
    const userId = localStorage.getItem('id')
    const role = localStorage.getItem('role')
    switch (role) {
      case 'employer':
        return <Redirect to={`/employer/${userId}`} />
      case 'employee':
        return <Redirect to={`/employee/${userId}`} />
      case 'admin':
          return <Redirect to='/admin' />
      default:
          return <Redirect to='/login' />
    }
  }

  return (
    <div className="app">
      <NavbarContextProvider>
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path='/' exact component={() => redirect()} isAuth={checkAuth} />
          <ProtectedRoute path="/employer/:employerId" exact component={Employer} isAuth={checkAuth} />
          <ProtectedRoute path="/employee/:employeeId" exact component={Employee} isAuth={checkAuth} />
          <ProtectedRoute path="/employee/:employeeId/:taskId" exact component={Task} isAuth={checkAuth} />
          <ProtectedRoute path="/admin" component={Admin} isAuth={checkAuth} />
        </Switch>
      </NavbarContextProvider>
    </div>
  );
}

export default App;
