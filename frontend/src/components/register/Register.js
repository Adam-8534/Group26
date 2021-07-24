import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Register = () => {

    var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');

    let registerEmail;
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerPassword;
    let returnMessage;

    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {
        if ( registerEmail.value.localeCompare("") == 0 || registerEmail.value.localeCompare("") == 0 ||
                registerFirstName.value.localeCompare("") == 0 || registerFirstName.value.localeCompare("") == 0 ||
                registerLastName.value.localeCompare("") == 0 || registerLastName.value.localeCompare("") == 0 ||
                registerUsername.value.localeCompare("") == 0 || registerUsername.value.localeCompare("") == 0 ||
                registerPassword.value.localeCompare("") == 0 || registerPassword.value.localeCompare("") == 0)
        {
            document.getElementById('returnMessage').innerText = "An input field was left blank";
            document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
            return;
        }

        event.preventDefault();

        var obj = {email: registerEmail.value, firstname: registerFirstName.value, lastname: registerLastName.value, 
                    login: registerUsername.value, password: registerPassword.value};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/register'),	
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
            console.log(res);
            if ( res.status.localeCompare("All Good") != 0 )
            {
                document.getElementById('returnMessage').innerText = res.status;
                document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
            }
            else 
            {	
                console.log("success");
                window.location.href = '/confirmRegister';
            }
        })
        .catch(function (error) 
        {
            document.getElementById('returnMessage').innerText = error;
            document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
            console.log(error);
        });
    }

    return ( 
        <div id="login-div">
            <h1 id="register-title">Register new user</h1>

            <div id="registerNames">
                <input type="text" className="register-input" id="registerFirstName" placeholder="First Name" ref={(c) => registerFirstName = c} /><br />
                <input type="text" className="register-input" id="registerLastName" placeholder="Last Name" ref={(c) => registerLastName = c} /><br />
            </div>

            <input type="text" className="register-input" id="registerEmail" placeholder="Email" ref={(c) => registerEmail = c} /><br />
            <input type="text" className="register-input" id="registerUsername" placeholder="Username" ref={(c) => registerUsername = c} /><br />
            <input type="password" className="register-input mb-3" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
            <Button className="logout-login-register-button mb-2" onClick={doRegister}>
                Register
            </Button>
            <p id="returnMessage" ref={(c) => returnMessage = c} ></p>
        </div>
     );
}
 
export default Register;