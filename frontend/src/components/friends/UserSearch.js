import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row, Button} from 'react-bootstrap';

function UserSearch() {
    
    var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');
    const jwt = require("jsonwebtoken");
    
    var run = '';
    var search = '';
    let searchUserName = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [runList,setRunList] = useState('');
    const [userList,setUserList] = useState('');
    
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var list = [];
    var list2 = [];
    var nameList;
    var nameList2;
    var fullname;
    var userId_toadd;
  
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
                    if ( (fullname.toLowerCase()).includes( search.value.toLowerCase() ) && (fullNameResults.length / 2) > i)
                    {
                        resultText += fullname + '\n';
                        list[i] = fullNameResults[i];
                        
                    }

                    else if ( (fullname.toLowerCase()).includes( search.value.toLowerCase() ) && (fullNameResults.length / 2) <= i)
                    {
                        resultText += fullname + '\n';
                        list2[i] = fullNameResults[i];
                    }
                }
                console.log(list);
                nameList = list.map((element) => <p className="display-users" key = {element.UserId}> {element.FullName} <Button variant="primary" className="search-user-buttons" id="addUserButton"
                onClick={searchUser, addFriend} > Add Friend </Button></p>); 

                nameList2 = list2.map((element) => <p className="display-users" key = {element.UserId}> {element.FullName} <Button variant="primary" className="search-user-buttons" id="addUserButton"
                onClick={searchUser, addFriend}> Add Friend </Button></p>); 
                console.log(nameList);
                setResults('User(s) have been retrieved');
                setRunList(nameList);
                setUserList(nameList2);
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
        // event.preventDefault();

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
   
    return (
        
        <div className="friends-page-subsection-add-friend leaderboard">
        <div className="friends-search-add">
            
            <div className="input-field">
            <p>{searchResults}</p>
            <input type="text" className="search-run-text" id="run-text" placeholder="Search user" 
                ref={(c) => search = c} />
            <Button variant="primary" className="search-run-buttons" id="addRunButton"
                onClick={searchUser}> Search User </Button><br />
            <span id="runAddResult">{message}</span>
            <Container className="userList">
                <Row>
                    <Col sm = {12}>{runList} </Col>
                    <Col sm = {12}>{userList} </Col>
                </Row>
            
            </Container>
            
            </div>
            
        </div>
        </div>
    );
   
}

export default UserSearch;