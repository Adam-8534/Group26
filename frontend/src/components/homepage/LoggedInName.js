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
    <hr id="user-profile-hr" style={{width: "300px"}} />
    <div className="user-profile-stats">
      <h5>Runs</h5>
      <h3> {totalRuns} </h3>
    </div>
    <hr id="user-profile-hr" />
    <div className="user-profile-stats">
      <h5>Friends</h5>
      <h3> {totalFriends} </h3>
    </div>
   </div>
  );

};


export default LoggedInName;
