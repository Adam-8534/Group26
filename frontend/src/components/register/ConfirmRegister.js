import React, { useState } from 'react';
import axios from 'axios';

const ConfirmRegister = () => {

    var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');

    let registerCode;
    let returnMessage;

    const [message,setMessage] = useState('');

    const doRegisterConfirm = async event => 
    {
        if ( registerCode.value.localeCompare("") == 0 || registerCode.value.localeCompare("") == 0 )
        {
            document.getElementById('returnMessage').innerText = "Please input the emailed code!";
            document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
            return;
        }

        event.preventDefault();

        var obj = {text: registerCode.value};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/verifyuser'),
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
            if ( res[0].localeCompare("All Good") != 0 ) 
            {
                document.getElementById('returnMessage').innerText = res[0];
                document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
            }
            else 
            {	
                console.log("success");
                window.location.href = '/homepage';
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
            <h1 id="register-title">Confirm Verification</h1>

            <h3 id="check-email-confirm">Check your email for a verification code</h3>
            <input type="text" className="register-input" id="registerCode" maxlength="4"
             placeholder="Enter four digit code" ref={(c) => registerCode = c} /><br />
            <input type="submit" id="login-button" className="buttons" value = "Confirm" onClick={doRegisterConfirm} /><br />
            <p id="returnMessage" ref={(c) => returnMessage = c} ></p>
        </div>
     );
}
 
export default ConfirmRegister;