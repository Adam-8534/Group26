import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import RunPage from './pages/RunPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmRegisterPage from './pages/ConfirmRegisterPage';
import FriendsPage from './pages/FriendsPage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/confirmRegister" exact>
          <ConfirmRegisterPage />
        </Route>
        <Route path="/homepage" exact>
          <RunPage />
        </Route>
        <Route path="/friends" exact>
          <FriendsPage />
        </Route>
        <Redirect to="" />
      </Switch>  
    </Router>
  );
}

export default App;
