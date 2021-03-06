import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function Login()
{

    var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/login'),	
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
            if (res.error) 
            {
                setMessage('User/Password combination incorrect');
            }
            else 
            {
                storage.storeToken(res.token);
                var jwt = require('jsonwebtoken');
    
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                  
                var user = {firstName:firstName,lastName:lastName,id:userId};
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/homepage';
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    }

    return(
        <div id="login-div">
            <h1 id="login-title">Welcome to Free Runner</h1>
            <span id="inner-login-title">PLEASE LOGIN</span><br />
            <input type="text" className="login-input" id="loginName" placeholder="Username" ref={(c) => loginName = c}  /><br />
            <input type="password" className="login-input mb-3" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
            <Button className="logout-login-register-button" onClick={doLogin}>
                Log in
            </Button>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;
