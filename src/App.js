import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard'
import Header from './components/Layout/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddProject from './components/Project/AddProject';
import { Provider } from 'react-redux';
import store from './store';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/projectBoard/ProjectBoard';
import AddProjectTask from './components/projectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/projectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import SecureRoute from './securityUtils/SecureRoute';
import { logout } from './actions/securityActions';

import jwt_decode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './actions/types';

const App = () => {

  const jwtToken = localStorage.jwtToken;

  if(jwtToken) {
    setJWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decoded_jwtToken
    });

    const currentTime = Date.now()/1000;
    if(decoded_jwtToken.exp < currentTime) {
      // handle logout
      store.dispatch(logout());
      window.location.href = "/";
    }
  }

  return (
     <Provider store={store}>
       <Router>
         <div className='App'>
           <Header />
           <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />

              <Route path='/dashboard' element={<SecureRoute component={Dashboard} />} />
              <Route path='/addProject' element={<SecureRoute component={AddProject} />} />
              <Route path='/updateProject/:id' element={<SecureRoute component={UpdateProject} />} />
              <Route path='/projectBoard/:id' element={<SecureRoute component={ProjectBoard} />} />
              <Route path='/addProjectTasks/:id' element={<SecureRoute component={AddProjectTask} />} />
              <Route path='/updateProjectTask/:backlog_id/:pt_id' element={<SecureRoute component={UpdateProjectTask} />} />
           </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;