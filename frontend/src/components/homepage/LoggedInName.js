import React from 'react';

function LoggedInName()
{

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    // var userId = ud.id;
    // var firstName = ud.firstName;
    // var lastName = ud.lastName;
    var userId = 12;
    var firstName = "firstname";
    var lastName = "lastname";

    const doLogout = event => 
    {
	    event.preventDefault();

      localStorage.removeItem("user_data")
      window.location.href = '/';

    };

  return(
   <div className="homepage-subsection" id="logged-in-div">
    <h2 id="userName">Welcome, {firstName} {lastName}!<br />Lets get running!</h2><br />
   </div>
  );

};


export default LoggedInName;
