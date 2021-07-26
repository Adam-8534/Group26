import React, { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Button, Modal } from 'react-bootstrap';

function FriendsSection()
{

  var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');
    const jwt = require("jsonwebtoken");
    
    var search = '';
    var searchFriend = '';

    const [message,setMessage] = useState('');
    const [friendMessage,setFriendMessage] = useState('');
    const [runList,setRunList] = useState('');
    const [friendsList,setFriendsList] = useState('');
    
    const [friendsViewFN,setFriendsViewFN] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var list = [];
    var nameList;
    var fullname;
    var userId_toadd;
    var userId_toremove;

    var friendFullName;
    let friendTotalDistance;
    let friendTotalRuns;
    let friendEmail;
  

    let listFriend = [];
    var friendList;

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

  // const handler = () => {
    
  //   editUser()
  //   editPassword();
  //   handleCloseEdit();
    
  // }

    const handleCloseEdit = () => setShowModalEdit(false);
    const handleShowEdit = () => setShowModalEdit(true);
    const handleCloseView = () => setShowModalView(false);
    const handleShowView = () => setShowModalView(true);

    const searchUser = async event => 
    {
        event.preventDefault();
        		
        var tok = storage.retrieveToken();
        var obj = {search:search.value,jwtToken:tok};
        var js = JSON.stringify(obj);

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
            var retTok = res.jwtToken;

            console.log(response.data)
    
            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                var fullNameResults = res.results;
                var resultText = '';
                // grabbing this so i can use it later.
                
                for(var i = 0; i < fullNameResults.length; i++)
                {
                    fullname = fullNameResults[i].FullName;
                    userId_toadd = fullNameResults[i].UserId;

                    
                    friendFullName = fullNameResults[i];
                    friendTotalDistance = fullNameResults[i].TotalDistance;
                    friendTotalRuns = fullNameResults[i].TotalRuns;
                    friendEmail = fullNameResults[i].Email;
                    
                    
                    
                    
                    if ( (fullname.toLowerCase()).includes( search.value.toLowerCase() ))
                    {
                        resultText += fullname + '\n';
                        list[i] = fullNameResults[i];
                        
                    }

                }
                console.log(list);
                nameList = list.map((element) => <p className="display-users" key = {element.UserId}> {element.FullName} <Button variant="primary" className="search-user-buttons" id="addUserButton"
                onClick={searchUser, addFriend} > Add Friend </Button></p>); 

                setMessage('User(s) have been retrieved');
                setRunList(nameList);
                setFriendsViewFN(friendFullName.FullName);
                storage.storeToken( {accessToken:retTok} );
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
        
    };

    const addFriend = async event => 
    {
      event.preventDefault();

    var tok = storage.retrieveToken();
    var obj = {userId:userId, userId_toadd:userId_toadd,  jwtToken:tok};
    var js = JSON.stringify(obj);
    console.log(userId_toadd);
    var config = 
    {
        method: 'post',
        url: bp.buildPath('../../../../api/addfriend'),	
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
            setMessage('Already A friend');
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
              setMessage('You have made a new friend!');
              storage.storeToken( {accessToken:retTok} );
          }
          
        }
    })
    .catch(function (error) 
    {
        console.log(error);
    });
  }

  const searchFriends = async event => 
    {
        event.preventDefault();
        		
        
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

                    
                      friendFullName = searchFriendResults[i].FullName;
                      friendTotalDistance = searchFriendResults[i].TotalDistance;
                      friendTotalRuns = searchFriendResults[i].TotalRuns;
                      friendEmail = searchFriendResults[i].Email;
                    
                      
                    
                    // console.log(fullnameFriend)
                    userId_toremove = searchFriendResults[i].UserId;  
                    if ( (fullnameFriend.toLowerCase()).includes( searchFriend.value.toLowerCase() ))
                    {
                        resultFriendText += fullnameFriend + '\n';
                        listFriend[i] = searchFriendResults[i];
                        
                    }

                }
                console.log("hello");
                
                
                friendList = listFriend.map((name) => <p className="display-friends" key = {name.UserId}> {name.FullName} <Button variant="primary" className="view-profile-buttons" id="viewProfileButton"
                onClick={searchFriends, handleShowView } > View Profile </Button></p>); 
                console.log(friendList);
                setFriendsViewFN(friendFullName);
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
        event.preventDefault();
        		
        var tok = storage.retrieveToken();
        var obj = {userId:userId, userId_toremove:userId_toremove, jwtToken:tok};
        var js = JSON.stringify(obj);

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

  return(
   <Container className="friends-page-subsection-add-friend leaderboard">
     <p>{message}</p>
     <Row className="friends-search-add">
        <Col sm={8}>
          <input type="text" id="search-user-input" id="run-text" placeholder="Search user" 
                ref={(c) => search = c} />
        </Col>
        <Col sm={4}>
          <Button variant="primary" className="search-run-buttons" id="addRunButton"
                onClick={searchUser}> Search User </Button>
        </Col>
        <Col sm={4}>
          <Button variant="primary" className="search-run-buttons" id="addRunButton"
                onClick={handleShowEdit}> Search Friends </Button>
        </Col>    
     </Row>
       
     <Row>
          <Col >{runList} </Col>
     </Row>
       
      <div>
        <Modal dialogClassName="Search Friends" show={showModalEdit} onHide={handleCloseEdit}>
          <Modal.Header>
            <Modal.Title>Search Friends</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{friendMessage}</p>
            <input type="text" className="search-friend-input" id="searchFriendFullName" placeholder="Search For a Friend"
            ref={(c) => searchFriend = c} /> <Button variant="primary" className="search-friend-buttons" id="addFriendButton"
            onClick={searchFriends} > Search Friend </Button><br />
            <Row>
              <Col>{friendsList}</Col>
            </Row>
            
          </Modal.Body>
          <Modal.Footer>
          <Button className="exit" variant="primary" onClick={handleCloseEdit}>
            Exit.
          </Button>
          </Modal.Footer>
          <div className="view-profile-modal">
            <Modal dialogClassName="View Profile" show={showModalView} onHide={handleCloseView}>
            <Modal.Header>
              <Modal.Title>View Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>{friendsViewFN}</p>
              
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" className="save-friend" id="saveFriendButton" onClick={handleCloseView}>Cancel</Button>
            <Button variant="danger" className="remove-friend-buttons" id="removeFriendButton"
                onClick={removeFriend} > Remove Friend </Button>
            </Modal.Footer>
            </Modal>
          </div>
        </Modal>
      </div> 
   </Container>
  );

};


export default FriendsSection;