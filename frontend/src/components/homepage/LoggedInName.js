import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function LoggedInName()
{

  let _ud = localStorage.getItem('user_data');
  let ud = JSON.parse(_ud);
  let userId = ud.id;
  let firstName = ud.firstName;
  let lastName = ud.lastName;

  let totalRuns = 0;
  let totalFriends = 0;
  let editEmail;
  let editFirstName;
  let editLastName;
  let editUsername;
  let editPassword;
  let returnMessage;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userProfileModal = () => window.location.href = '/friends';

  

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

    <div className="edit-user-modal">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
        <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="registerNames">
              <input type="text" className="register-input" id="registerFirstName" placeholder="First Name" ref={(c) => editFirstName = c} /><br />
              <input type="text" className="register-input" id="registerLastName" placeholder="Last Name" ref={(c) => editLastName = c} /><br />
          </div>

          <input type="text" className="register-input" id="registerEmail" placeholder="Email" ref={(c) => editEmail = c} /><br />
          <input type="text" className="register-input" id="registerUsername" placeholder="Username" ref={(c) => editUsername = c} /><br />
          <input type="password" className="register-input" id="registerPassword" placeholder="Password" ref={(c) => editPassword = c} />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
   </div>
  );

};


export default LoggedInName;
