import React, { useState } from 'react';
import axios from 'axios';

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
            if (res.error) 
            {
                setMessage('register error');
            }
            else 
            {	
                console.log("success");
                // storage.storeToken(res);
                // var jwt = require('jsonwebtoken');
    
                // var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                // var userId = ud.payload.userId;
                // var firstName = ud.payload.firstName;
                // var lastName = ud.payload.lastName;
                  
                // var user = {firstName:firstName,lastName:lastName,id:userId};
                // localStorage.setItem('user_data', JSON.stringify(user));
                // window.location.href = '/homepage';

                // returnMessage.value = res;
            }
        })
        .catch(function (error) 
        {
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
            <input type="password" className="register-input" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
            <input type="submit" id="login-button" className="buttons" value = "Register" onClick={doRegister} /><br />
            {/* <p id="returnMessage" ref={(c) => returnMessage = c} > </p> */}
            {/* <span id="loginResult">{message}</span> */}
        </div>
     );
}
 
export default Register;