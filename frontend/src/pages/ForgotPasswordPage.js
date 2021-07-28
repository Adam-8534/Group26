import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import BackToLogin from '../components/register/BackToLogin';



const ConfirmRegisterPage = () =>
{

  var bp = require('../components/Path.js');
  var storage = require('../tokenStorage.js');
  const jwt = require("jsonwebtoken");

  let returnMessage = '';
  let userEmail;

  const sendPasswordResetEmail = async event => 
  {
      if ( userEmail.value.localeCompare("") == 0 || userEmail.value.localeCompare(" ") == 0 )
      {
          document.getElementById('returnMessage').innerText = "Please input your email!";
          document.getElementById('returnMessage').style = "color: red; font-weight: bold;";
          return;
      }

      event.preventDefault();

      var obj = {email: userEmail.value};
      var js = JSON.stringify(obj);

      var config = 
      {
          method: 'post',
          url: bp.buildPath('../../../../api/sendpasswordemail'),
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
              window.location.href = '/forgotPasswordConfirm';
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

            <h3 id="check-email-confirm">Enter email associated with your account</h3>
            <input type="text" className="register-input" id="registerCode" placeholder="Email" 
            ref={(c) => userEmail = c} /><br />
            <Button className="logout-login-register-button mb-4" onClick={sendPasswordResetEmail} >
                Send code
            </Button>
            <p id="returnMessage" ref={(c) => returnMessage = c} ></p>
        </div>
        <BackToLogin />
      </div>
    );
};

export default ConfirmRegisterPage;
