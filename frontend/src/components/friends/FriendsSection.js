import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';

function FriendsSection()
{

  let userSearch = '';

  return(
   <Container className="friends-page-subsection-add-friend leaderboard">
     <Row className="friends-search-add">
        <Col>
          <input type="text" id="search-user-input" placeholder="Search user" ref={(c) => userSearch = c} />
        </Col>
        <Col>
          <Button variant="primary" style={{borderRadius: "8px", height: "32px"}} /*onClick={}*/>
            Add friend +
          </Button>
        </Col>
        
     </Row>
       {/* <div className="friends-search-add">
       
       </div> */}
   </Container>
  );

};


export default FriendsSection;