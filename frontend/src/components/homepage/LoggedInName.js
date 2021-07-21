import React from 'react';

function LoggedInName()
{

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;

    let totalRuns = 0;
    let totalFriends = 0;


  return(
   <div className="homepage-user-profile" id="logged-in-div">
    <h2 id="userName">Welcome, <br /> {firstName} {lastName}</h2>
    <div className="user-profile-stats">
      <h4>Runs</h4>
      <h2> {totalRuns} </h2>
    </div>
    <hr id="user-profile-hr" />
    <div className="user-profile-stats">
      <h4>Friends</h4>
      <h2> {totalFriends} </h2>
    </div>
   </div>
  );

};


export default LoggedInName;
