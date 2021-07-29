import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ConfirmRegisterPage = () =>
{

    var bp = require('../components/Path.js');
    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");

    let passKey;
    let newPass;

    const doForgotPassword = async event => 
    {
        if ( passKey.value.localeCompare("") == 0 || passKey.value.localeCompare(" ") == 0 )
        {
            document.getElementById('returnMessage').innerText = "Please input the emailed code!";
            document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
            return;
        }

        event.preventDefault();

        var obj = {passkey: passKey.value, newPass: newPass.value};
        var js = JSON.stringify(obj);
        console.log(js)

        var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/passwordreset'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            console.log(res)
            if ( res.error.localeCompare("") != 0) 
            {
                document.getElementById('returnMessage').innerText = res.error;
                document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
            }
            else 
            {	
                console.log("success");
                console.log(res)
                window.location.href = '/login';
            }
        })
        .catch(function (error) 
        {
            document.getElementById('returnMessage').innerText = error;
            document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
            console.log(error);
        });
    }

    return(
      <div className="login-page-container">
        <div id="login-div">
            <h1 id="register-title">Password Reset</h1>

            <h3 id="check-email-confirm">Check your email for a verification code</h3>
            <input type="text" className="register-input mb-3" id="registerCode" maxlength="4" placeholder="Enter four digit code" 
              ref={(c) => passKey = c} /><br />

            <h3 id="check-email-confirm">Enter new password</h3>
            <input type="text" className="register-input" id="registerCode" placeholder="Password" 
              ref={(c) => newPass = c} /><br />
            <Button className="logout-login-register-button" onClick={doForgotPassword}>
                Reset
            </Button>
            <p id="returnMessage" ></p>
        </div>
      </div>
    );
};

export default ConfirmRegisterPage;
