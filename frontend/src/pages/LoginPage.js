import React from 'react';
import Login from '../components/login/Login';
import SignUp from '../components/login/SignUp';

const LoginPage = () =>
{

    return(
      <div className="login-page-container">
        <Login />
        <SignUp />
        
      </div>
    );
};

export default LoginPage;
