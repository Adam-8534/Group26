import React from 'react';
import Register from '../components/register/Register';
import BackToLogin from '../components/register/BackToLogin';

const RegisterPage = () =>
{

    return(
      <div className="login-page-container">
        <Register />
        <BackToLogin />
      </div>
    );
};

export default RegisterPage;
