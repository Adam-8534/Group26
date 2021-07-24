import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function LoggedInName()
{

  var bp = require('../Path.js');
  var storage = require('../../tokenStorage.js');

  let _ud = localStorage.getItem('user_data');
  let ud = JSON.parse(_ud);
  let userId = ud.id;
  let firstName = ud.firstName;
  let lastName = ud.lastName;

  let totalRuns = 0;
  let totalFriends = 0;
  let editEmail = '';
  let editFirstName = '';
  let editLastName = '';
  let editUsername = '';
  let oldPassword = '';
  let newPassword = '';
  let returnMessage;

  const [show, setShow] = useState(false);

  const handler = () => {
    
    editUser()
    editPassword();
    handleClose();
    
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editUser = async event => 
  {
    // event.preventDefault();
    var tok = storage.retrieveToken();
    var obj = {userId:userId, firstname: editFirstName.value, lastname: editLastName.value, 
      username: editUsername.value, email: editEmail.value, jwtToken:tok};
    var js = JSON.stringify(obj);

    var editConfig = 
    {
        method: 'post',
        url: bp.buildPath('../../../../api/editUser'),	
        headers: 
        {
            'Content-Type': 'application/json'
        },
        data: js
    };

    console.log(js)

    axios(editConfig)
        .then(function (response) 
    {
        var res = response.data;
        console.log(res)
        if (res.error) 
        {
            // setMessage('User/Password combination incorrect');
        }
        else 
        {
          var res = response.data;
          var retTok = res.jwtToken;
  
          if( res.error.length > 0 )
          {
              // setMessage( "API Error:" + res.error );
          }
          else
          {
              console.log("account updated");
              storage.storeToken( {accessToken:retTok} );

              if ( obj.firstname.localeCompare('') != 0 )
                firstName = obj.firstname;
              if ( obj.lastname.localeCompare('') != 0 )
                lastName = obj.lastname;

              var user = {firstName:firstName,lastName:lastName,id:userId};
              
              localStorage.setItem('user_data', JSON.stringify(user));
              console.log(user)
              window.location.href = '/homepage';
          }
        }
    })
    .catch(function (error) 
    {
        console.log(error);
    });
  }

  const editPassword = async event => 
  {
    if ( oldPassword.value.localeCompare("") == 0 && newPassword.value.localeCompare("") == 0 )
      return;

    // event.preventDefault();
    var tok = storage.retrieveToken();
    var obj = {userId:userId, existing_password:oldPassword.value, new_password:newPassword.value, jwtToken:tok};
    var js = JSON.stringify(obj);
    

    var passwordConfig = 
    {
        method: 'post',
        url: bp.buildPath('../../../../api/editPassword'),	
        headers: 
        {
            'Content-Type': 'application/json'
        },
        data: js
    };

    axios(passwordConfig)
        .then(function (response) 
    {
        var res = response.data;
        console.log(res)
        if (res.error) 
        {
            // setMessage('User/Password combination incorrect');
        }
        else 
        {
          var res = response.data;
          var retTok = res.jwtToken;
  
          if( res.error.length > 0 )
          {
              // setMessage( "API Error:" + res.error );
          }
          else
          {
              console.log("account password updated");
              
              storage.storeToken( {accessToken:retTok} );
          }
        }
    })
    .catch(function (error) 
    {
        console.log(error);
    });
  }

  return(
   <div className="homepage-user-profile" id="logged-in-div">
    <h2 id="userName">Welcome, <br /> {firstName} {lastName}</h2>
    <hr id="user-profile-hr" style={{width: "300px"}} />
    <div className="user-profile-stats">
      <h5>Runs</h5>
      <h3> {totalRuns} </h3>
    </div>
    <hr id="user-profile-hr" />
    <div className="user-profile-stats">
      <h5>Friends</h5>
      <h3> {totalFriends} </h3>
    </div>
    <hr id="user-profile-hr" style={{width: "300px"}} />
    <Button variant="primary" className="edit-profile-button" onClick={handleShow}>
        Edit Account
    </Button>

    <div>
      <Modal dialogClassName="edit-user-modal" show={show} onHide={handleClose}>
        <Modal.Header>
        <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="registerNames">
            <h5>Change first name</h5>
            <input type="text" className="register-input" id="registerFirstName" placeholder="First Name" ref={(c) => editFirstName = c} /><br />
            <hr id="user-profile-hr pull-left" style={{width: "240px"}} />
            <h5>Change last name</h5>
            <input type="text" className="register-input" id="registerLastName" placeholder="Last Name" ref={(c) => editLastName = c} /><br />
            <hr id="user-profile-hr pull-left" style={{width: "240px"}} />
          </div>

          <h5>Change email</h5>
          <input type="text" className="register-input" id="registerEmail" placeholder="Email" ref={(c) => editEmail = c} /><br />
          <hr id="user-profile-hr pull-left" style={{width: "240px"}} />
          <h5>Change username</h5>
          <input type="text" className="register-input" id="registerUsername" placeholder="Username" ref={(c) => editUsername = c} /><br />
          <hr id="user-profile-hr pull-left" style={{width: "240px"}} />
          <h5>Enter exisiting password</h5>
          <input type="password" className="register-input" id="registerOldPassword" placeholder="Exisiting Password" ref={(c) => oldPassword = c} />
          <h5 className="mt-2">Enter new password</h5>
          <input type="password" className="register-input" id="registerNewPassword" placeholder="New Password" ref={(c) => newPassword = c} />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {/* <Button variant="primary" onClick={() => { handleClose(); editUser(); editPassword();}}> */}
        <Button variant="primary" onClick={ handler }>
          Save
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
   </div>
  );

};


export default LoggedInName;
