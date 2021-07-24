import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


function Leaderboard()
{
  var bp = require('../Path.js');
  var storage = require('../../tokenStorage.js');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message,setMessage] = useState('');
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userId = ud.id;


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
   <div className="friends-page-subsection-leaderboard leaderboard">
       <div className="">
            <h2>leaderboard</h2>
            <p>Would You like to delete your account?</p>
            <Button variant="primary" onClick={handleShow}>
                Delete User
            </Button>
            <div className="delete-user-modal">
              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete your Account forever 
                 are you sure you want to do this</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  No, I wish to Keep.
                </Button>
                <Button variant="danger" onClick={handleClose, deleteUser}>
                  Delete My Account
                </Button>
                </Modal.Footer>
              </Modal>
            </div>

       </div>
   </div>
  );

};


export default Leaderboard;
