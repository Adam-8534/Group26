import React, { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';

function FriendsSection()
{

  var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');
    const jwt = require("jsonwebtoken");
    
    var search = '';

    const [message,setMessage] = useState('');
    const [runList,setRunList] = useState('');
    
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var list = [];
    var nameList;
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
     </Row>
       
     <Row>
          <Col >{runList} </Col>
     </Row>
       
   </Container>
  );

};


export default FriendsSection;