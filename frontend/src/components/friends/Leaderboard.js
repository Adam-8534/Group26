import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Leaderboard()
{
  var bp = require('../Path.js');
  var storage = require('../../tokenStorage.js');

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [message,setMessage] = useState('');
 
  const [leaderboardLists,setLeaderboardLists] = useState('');
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userId = ud.id;

  let list;
  var leaderboardList;

  const listFriend = async event => 
  {
    var tok = storage.retrieveToken();
    var obj = {userId:userId,jwtToken:tok};
    var js = JSON.stringify(obj);
    console.log('Hello..')
    var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/listfriends'),	
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
          var retTok = res.jwtToken;

          if( res.error.length > 0 )
          {
              setMessage( "API Error:" + res.error );
          }
          else
          {
            leaderboardList = res.results;
            
            for (var i = 0; i < leaderboardList.length; i++)
            {
              if (i < 10)
                var lL = leaderboardList[i]
            }

            lL.sort(function(a, b){
              return  b.TotalDistance - a.TotalDistance ;
            });
            
            
            
            console.log('hello.........');
            storage.storeToken( {accessToken:retTok} );
          }
          console.log(leaderboardList);
          list = lL.map((friend, index) => <p className="display-leaderboard" key = {friend.UserId}> {index+1+'.'} {friend.FullName} {friend.TotalDistance} {friend.TotalRuns} </p>);
          console.log(list);
          setLeaderboardLists(list);
        })
        .catch(function (error) 
        {
            console.log(error);
        });
  }
  
  useEffect(()=>{
    listFriend();
  }, [])
  

  return(
   <div className="friends-page-subsection-leaderboard leaderboard">
       <div className="">
         
            <h2>Leaderboard</h2>
            <Col><h5>{leaderboardLists}</h5></Col>
            
            
            

       </div>
   </div>
  );

};


export default Leaderboard;
