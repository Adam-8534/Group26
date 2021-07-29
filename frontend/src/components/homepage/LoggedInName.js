import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button, Alert } from 'react-bootstrap';
import Gravatar from 'react-gravatar'

function LoggedInName()
{

  var bp = require('../Path.js');
  var storage = require('../../tokenStorage.js');
  const jwt = require("jsonwebtoken");

  let _ud = localStorage.getItem('user_data');
  let ud = JSON.parse(_ud);
  let userId = ud.id;
  let firstName = ud.firstName;
  let lastName = ud.lastName;
  let userFullName = firstName + " " + lastName;

  let totalRuns = 0;
  let totalFriends = 0;
  let editEmail = '';
  let editFirstName = '';
  let editLastName = '';
  let editUsername = '';
  let oldPassword = '';
  let newPassword = '';
  let returnMessage;
  
  const [userEmail,setUserEmail] = useState('');
  const [userTotalRuns,setUserTotalRuns] = useState('');
  const [userTotalFriends,setTotalFriends] = useState('');
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handler = () => {
    editUser();
    editPassword();
    handleCloseEdit();
  }

  const handleCloseEdit = () => setShowModalEdit(false);
  const handleShowEdit = () => setShowModalEdit(true);
  const handleCloseDelete = () => 
  {
    setShowModalDelete(false);
  }
    
  const handleShowDelete = () => setShowModalDelete(true);

  const [message,setMessage] = useState('');

  // searchUser for gravatar

  const searchForEmail = async event => 
    {
        // event.preventDefault();

        console.log(userFullName)
        var tok = storage.retrieveToken();
        var obj = {search:userFullName, jwtToken: tok};
        
        var js = JSON.stringify(obj);
        console.log(js)

        var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/searchusers'),
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
            console.log(response)

            if( res.error.length > 0 )
            {
              console.log("alright")
                setMessage( "API Error:" + res.error );
            }
            else
            {
              console.log(res)
                var searchFriendResults = res.results;
                console.log(searchFriendResults);

                let email = searchFriendResults[0].Email;
                let userTotalRuns = searchFriendResults[0].TotalRuns;
                let userTotalFriends = searchFriendResults[0].FriendsArray.length;
                console.log(email)
                console.log(userTotalRuns)
                console.log(userTotalFriends)
                
                setUserEmail(email);
                setUserTotalRuns(userTotalRuns);
                setTotalFriends(userTotalFriends);

            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
        
    };

  useEffect(()=>{
    searchForEmail();
  }, [])

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
  
  const deleteUser = async event => 
  {
    event.preventDefault();
    var tok = storage.retrieveToken();
    var obj = {userId:userId, jwtToken:tok};
    var js = JSON.stringify(obj);

    var config = 
    {
        method: 'post',
        url: bp.buildPath('../../../../api/deleteuser'),	
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
          var res = response.data;
          var retTok = res.jwtToken;
  
          if( res.error.length > 0 )
          {
              setMessage( "API Error:" + res.error );
          }
          else
          {
              setMessage('Your account has been deleted');
              storage.storeToken( {accessToken:retTok} );
          }
          window.location.href = '/';
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

    <Gravatar className="gravatar-images mb-3" size={100} email={userEmail} />

    <hr id="user-profile-hr" style={{width: "300px"}} />
    <div className="user-profile-stats">
      <h5>Runs</h5>
      <h3> {userTotalRuns} </h3>
    </div>
    <hr id="user-profile-hr" />
    <div className="user-profile-stats">
      <h5>Friends</h5>
      <h3> {userTotalFriends} </h3>
    </div>
    <hr id="user-profile-hr" style={{width: "300px"}} />
    <Button variant="primary" className="edit-profile-button" onClick={handleShowEdit}>
        Edit Account
    </Button>

    <div>
      
      <Modal dialogClassName="edit-user-modal" show={showModalEdit} onHide={handleCloseEdit}>
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

        <Button className="deleteAccount" variant="danger" onClick={handleShowDelete}>
            Delete User
        </Button>
        <div className="delete-user-modal">
          <Modal show={showModalDelete} onHide={handleCloseDelete}>
            <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)}>
              <Alert.Heading>Account deleted</Alert.Heading>
              <p>Your account has been deleted! Goodbye</p>
              <Button variant="danger" onClick={handleCloseDelete, deleteUser}>Exit</Button>
            </Alert>
            
            <Modal.Header>
            <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>You are about to delete your Account forever 
              are you sure you want to do this</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              No, I wish to Keep.
            </Button>
            {/* <Button variant="danger" onClick={handleCloseDelete, deleteUser}>
              Delete My Account
            </Button> */}
            <Button variant="danger" onClick={() => setShowAlert(true)}>
              Delete My Account
            </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <Button variant="secondary" onClick={handleCloseEdit}>
          Cancel
        </Button>
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
