import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';

function FriendsSection()
{

  var bp = require('../Path.js');
  var storage = require('../../tokenStorage.js');

  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userId = ud.id;

  let searchUserName = '';
  let searchUsersArray = [];

  const searchUsers = async event => 
    {
        event.preventDefault();
        		
        var tok = storage.retrieveToken();
        var obj = {userId:userId,search:'',jwtToken:tok};
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
                // setMessage( "API Error:" + res.error );
            }
            else
            {
                var fullNameResults = res.results;
                var resultText = '';

                fullNameResults.forEach( (userObject, index) => {
                    if ( (userObject.FullName.toLowerCase()).includes( searchUserName.value.toLowerCase() ) )
                    {
                        console.log(userObject.FullName)
                        searchUsersArray.push(userObject.FullName);
                    }
                    
                });
                console.log(searchUsersArray)
                storage.storeToken( {accessToken:retTok} );
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    };

  return(
   <Container className="friends-page-subsection-add-friend leaderboard">
     <Row className="friends-search-add">
        <Col sm={8}>
          <input type="text" id="search-user-input" placeholder="Search user" ref={(c) => searchUserName = c} />
        </Col>
        <Col sm={3}>
          <Button variant="primary" style={{borderRadius: "8px", height: "32px"}} onClick={searchUsers}>
            Add friend +
          </Button>
        </Col>   
     </Row>
        <Col>
          
        </Col>
     <Row>

     </Row>
       {/* <div className="friends-search-add">
       
       </div> */}
   </Container>
  );

};


export default FriendsSection;