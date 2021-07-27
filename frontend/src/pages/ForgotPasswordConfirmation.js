import React from 'react';
import { Button } from 'react-bootstrap';

const ConfirmRegisterPage = () =>
{

    return(
      <div className="login-page-container">
        <div id="login-div">
            <h1 id="register-title">Password Reset</h1>

            <h3 id="check-email-confirm">Check your email for a verification code</h3>
            <input type="text" className="register-input" id="registerCode" placeholder="Enter four digit code" /><br />
            <Button className="logout-login-register-button" >
                Reset
            </Button>
            <p id="returnMessage" ></p>
        </div>
      </div>
    );
};

export default ConfirmRegisterPage;
