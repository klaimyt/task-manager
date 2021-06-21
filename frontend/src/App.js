import "./App.css";
import React from 'react'
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
// Routes
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './layout/Navbar/Navbar'
import Task from './pages/Task'
import Admin from './pages/Admin'
import Employer from './pages/Employer'
import Employee from './pages/Employee'
import { NavbarContextProvider } from './store/navbar-context'
import { ModalContextProvider } from './store/modal-context'
import FourOhFour from "./pages/FourOhFour";

function App() {
  const history = useHistory()

  function checkAuth() {
      const user = localStorage.getItem('username')
      return user ? true : false 
  }

  // Check for 401 response
  axios.interceptors.response.use(null, (e) => {
    if (e.response.status === 401) {
      localStorage.clear()
      history.push('/login')
    }
    return Promise.reject(e);
  })

  // Redirect when logged in user open default ('/') route
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
        <ModalContextProvider>
          <Navbar />
          <Switch>
            <Route path="/login" exact component={Login} />
            <ProtectedRoute path='/' exact component={() => redirect()} isAuth={checkAuth} />
            <ProtectedRoute path="/employer/:employerId" exact component={Employer} isAuth={checkAuth} />
            <ProtectedRoute path="/employee/:employeeId" exact component={Employee} isAuth={checkAuth} />
            <ProtectedRoute path="/employee/:employeeId/:taskId" exact component={Task} isAuth={checkAuth} />
            <ProtectedRoute path="/admin" component={Admin} isAuth={checkAuth} />
            <Route path='*' component={FourOhFour} />
          </Switch>
        </ModalContextProvider>
      </NavbarContextProvider>
    </div>
  );
}

export default App;
