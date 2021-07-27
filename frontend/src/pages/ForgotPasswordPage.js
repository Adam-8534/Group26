import React from 'react';
import { Button } from 'react-bootstrap';

const ConfirmRegisterPage = () =>
{

    return(
      <div className="login-page-container">
        <div id="login-div">
            <h1 id="register-title">Password Reset</h1>

            <h3 id="check-email-confirm">Enter email associated with your account</h3>
            <input type="text" className="register-input" id="registerCode" placeholder="alex@ucf.edu" /><br />
            <Button className="logout-login-register-button mb-4" >
                Send code
            </Button>
        </div>
      </div>
    );
};

export default ConfirmRegisterPage;
