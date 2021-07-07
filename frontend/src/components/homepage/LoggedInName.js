import React from 'react';

function LoggedInName()
{

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

  return(
   <div className="homepage-subsection" id="logged-in-div">
    <h2 id="userName">Welcome, {firstName} {lastName}!<br />Lets get running!</h2><br />
   </div>
  );

};


export default LoggedInName;
