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


  

  return(
   <div className="friends-page-subsection-leaderboard leaderboard">
       <div className="">
            <h2>leaderboard</h2>
            

       </div>
   </div>
  );

};


export default Leaderboard;
