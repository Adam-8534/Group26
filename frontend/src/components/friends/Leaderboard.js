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
              var lL = leaderboardList[i]
            }

            lL.sort(function(a, b){
              return  b.TotalDistance - a.TotalDistance ;
            });
            
            storage.storeToken( {accessToken:retTok} );
          }
          console.log(leaderboardList);
          list = lL.map((friend, index) => 
          <Row className="display-leaderboard" key = {friend.UserId}>
            <Col sm={3}>
              <p>{index+1+'.'}</p>
            </Col>
            <Col sm={3}>
              {friend.FullName}
            </Col>
            <Col sm={3}>
              {friend.TotalDistance.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </Col>
            <Col sm={3}>
              {friend.TotalRuns}
            </Col>
          </Row>
          // <p className="display-leaderboard" key = {friend.UserId}> {index+1+'.'} {friend.FullName+' |'+ '| '} {friend.TotalDistance+' |' + '| '} {friend.TotalRuns} </p>
          );
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
            {/* <h5>FullName || Distance(mi) || Runs</h5> */}
            <Row>
              <Col sm={3}>
              <h5>Position</h5>
              </Col>
              <Col sm={3}>
              <h5>FullName</h5>
              </Col>
              <Col sm={3}>
              <h5>Distance(mi)</h5>
              </Col>
              <Col sm={3}>
              <h5>Runs</h5>
              </Col>
            </Row>
            <hr id="user-profile-hr" style={{width: "560px"}} />
            <Row>
              <h5>{leaderboardLists}</h5>
            </Row>
            {/* <Col></Col> */}
            
            
            

       </div>
   </div>
  );

};


export default Leaderboard;
