import React from 'react';
import Col from 'react-bootstrap/Col'

function LoggedInName()
{

  return(
   <div className="homepage-user-profile" id="logged-in-div">
     <Col sm={12}>
      <h3>Try out our free mobile app</h3>
     </Col>
     <Col sm={12}>
      <img src="https://d3nn82uaxijpm6.cloudfront.net/assets/onboarding/mobile_app-ac2d2af9ceacf1b5d362ea3b4d7d7a42ef21e96c6a4677b6d1a5031704daa14e.jpg" alt="" />
     </Col>
     <Col sm={12}>
       <h5 style={{marginTop: "5px"}}>Record, analyze and share activities right from your phone. 
          Our free mobile app keeps you connected with friends and ready for the next workout.</h5>
     </Col>
       
    
    
   </div>
  );

};


export default LoggedInName;
