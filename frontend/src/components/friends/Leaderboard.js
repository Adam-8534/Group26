import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Gravatar from 'react-gravatar'

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
            url: bp.buildPath('../../../../api/listleaderboard'),	
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
            <Col sm={2}>
              <p style={{marginLeft: "10px"}}>{index+1+'.'}</p>
            </Col>
            <Col sm={4}>
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


  // START View Friends Logic section

  const [friendsViewFN,setFriendsViewFN] = useState('');
  const [friendsViewTotalDistance,setFriendsViewTotalDistance] = useState('');
  const [friendsViewTotalRuns,setFriendsViewTotalRuns] = useState('');
  const [friendsViewEmail,setFriendsViewEmail] = useState('');
  const [removeId,setRemoveId] = useState('');
  const [friendMessage,setFriendMessage] = useState('');
  const [friendsList,setFriendsList] = useState('');

  var search = '';
  var searchFriend = '';
  var friendList;
  let friendFullName;
  let friendTotalDistance;
  let friendTotalRuns;
  let friendEmail;
  var userId_toRemove;
  let listFriendSearch = [];

  // START Handler functions

  const [showModalView, setShowModalView] = useState(false);
  const handleCloseView = () => setShowModalView(false);
  const handleShowView = () => setShowModalView(true);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleCloseEdit = () => setShowModalEdit(false);
  const handleShowEdit = () => setShowModalEdit(true);
  

  function removeFriendHandler () {
    removeFriend();
    handleCloseView();
  }

  let viewFriendHandler = (userToShow) => {
    setRemoveId(userToShow.UserId);

    friendFullName = userToShow.FullName;
    friendTotalDistance = userToShow.TotalDistance;
    friendTotalRuns = userToShow.TotalRuns;
    friendEmail = userToShow.Email;

    setFriendsViewFN(friendFullName)
    setFriendsViewTotalDistance(friendTotalDistance)
    setFriendsViewTotalRuns(friendTotalRuns)
    setFriendsViewEmail(friendEmail)

    handleShowView();
  }

  // END Handler functions

  const searchFriends = async event => 
  {
      // event.preventDefault();

      var obj = {userId:userId, search:searchFriend.value};
      
      var js = JSON.stringify(obj);

      var config = 
      {
          method: 'post',
          url: bp.buildPath('../../../../api/searchfriends'),	
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
          console.log(response.data);
          

          console.log('We are Here' + search.value);
          //console.log(response.data)
  
          if( res.error.length > 0 )
          {
              setMessage( "API Error:" + res.error );
          }
          else
          {
              var searchFriendResults = res.results;
              console.log(res.results);
              console.log(searchFriendResults);

              var resultFriendText = '';
              // grabbing this so i can use it later.
              

              for(var i = 0; i < searchFriendResults.length; i++)
              {
                  var fullnameFriend = searchFriendResults[i].FullName;

                  
                    
                  
                    
                  
                  // console.log(fullnameFriend)
                  // userId_toremove = searchFriendResults[i].UserId;  
                  if ( (fullnameFriend.toLowerCase()).includes( searchFriend.value.toLowerCase() ))
                  {
                      resultFriendText += fullnameFriend + '\n';
                      listFriendSearch[i] = searchFriendResults[i];
                      
                  }

              }
              
              // friendList = listFriend.map((name) => <p className="display-friends" key = {name.UserId}> {name.FullName} <Button variant="primary" className="view-profile-buttons" id="viewProfileButton"
              // onClick={searchFriends, handleShowView } > View Profile </Button></p>);

              console.log(listFriendSearch)

              friendList = listFriendSearch.map((name) => <p className="display-friends" key = {name.UserId}> {name.FullName} <Button variant="primary" className="view-profile-buttons" id="viewProfileButton"
              onClick={() => viewFriendHandler(name)} > View Profile </Button></p>);
              
              console.log(friendList);
              
              setFriendMessage('Friend(s) have been retrieved');
              setFriendsList(friendList);
              
              
          }
      })
      .catch(function (error) 
      {
          console.log(error);
      });
      
  };

  const removeFriend = async event => 
  {
      // event.preventDefault();
          
      var tok = storage.retrieveToken();
      var obj = {userId:userId, userId_toremove:removeId, jwtToken:tok};
      var js = JSON.stringify(obj);
      console.log(js)

      var config = 
      {
          method: 'post',
          url: bp.buildPath('../../../../api/removefriend'),	
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
          setMessage('You can not remove that friend.');
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
            setMessage('Your friend has been removed');
            storage.storeToken( {accessToken:retTok} );
        }
        
      }
  })
  .catch(function (error) 
  {
      console.log(error);
  });
  }

  // END View Friends Logic section

  return(
   <div className="friends-page-subsection-leaderboard leaderboard userSearchList">
      <div className="">
        
          <Row>
            <Col sm={3}>
              <Button variant="primary" className="search-run-buttons" id="addRunButton"
                        onClick={handleShowEdit}>Friends</Button>       
            </Col>
            <Col sm={6}>
            <h2 style={{ marginBottom: "3px"}}>Leaderboard</h2>
            <hr id="user-profile-hr" style={{width: "230px", marginBottom: "15px"}} />
            </Col>
            <Col sm={3}>
              <Button variant="primary" className="search-run-buttons" id="refresh-list" style={{marginRight: "10px"}}
                      onClick={listFriend}>Refresh list</Button>
            </Col>
          </Row>

          <Row>
            <Col sm={2}>
            <h5 style={{marginLeft: "10px"}}>Position</h5>
            </Col>
            <Col sm={4}>
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
      </div>

      <Row className="" id="search-friends-container">
          
      </Row>

      <div>
        <Modal dialogClassName="Search Friends" show={showModalEdit} onHide={handleCloseEdit}>
          <Modal.Header>
            <Modal.Title>Search Friends</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{friendMessage}</p>
            <input type="text" className="search-friend-input mb-3" id="searchFriendFullName" placeholder="Search For a Friend"
            ref={(c) => searchFriend = c} /> <Button style={{float: "right"}} variant="primary" className="search-friend-buttons" id="addFriendButton"
            onClick={searchFriends} > Search Friend </Button><br />
            <Row>
              <Col>{friendsList}</Col>
            </Row>
            
          </Modal.Body>
          <Modal.Footer>
          <Button className="exit" variant="danger" onClick={handleCloseEdit}>
            Exit
          </Button>
          </Modal.Footer>
          <div className="view-profile-modal">
            <Modal dialogClassName="View Profile" show={showModalView} onHide={handleCloseView}>
            <Modal.Header>
              <Modal.Title>View Profile</Modal.Title>
              <Gravatar className="gravatar-images mb-3" size={75} email={friendsViewEmail} />
            </Modal.Header>

            <Modal.Body>
              <Row>
                <strong>Name: </strong>
                <p>{friendsViewFN}</p>
              </Row>
              <Row>
                <strong>Email: </strong>
                <p>{friendsViewEmail}</p>
              </Row>
              <Row>
                <strong>Total run distance: </strong>
                <p>{friendsViewTotalDistance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              </Row>
              <Row>
                <strong>Total runs: </strong>
                <p>{friendsViewTotalRuns}</p>
              </Row>
              
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" className="save-friend" id="saveFriendButton" onClick={handleCloseView}>Cancel</Button>
            <p>{userId_toRemove}</p>
            <Button variant="danger" className="remove-friend-buttons" id="removeFriendButton"
                onClick={removeFriendHandler} > Remove Friend </Button>
            </Modal.Footer>
            </Modal>
          </div>
        </Modal>
      </div> 
   </div>
  );

};


export default Leaderboard;
