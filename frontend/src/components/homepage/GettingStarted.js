import React from 'react';
import { Button } from 'react-bootstrap';

function LoggedInName()
{

  const goToRuns = () => window.location.href = '/runs';
  const goToFriends = () => window.location.href = '/friends';

  return(
   <div className="homepage-getting-started" id="logged-in-div">
    {/* <img clasName="image" src={ image }></img> */}
    <div className="getting-started-text-box">
      <h1 id="getting-started-text">Lets get started</h1>
      <h3 style={{color: "#494950"}}>We've listed some ways to begin your journey with Free Runner</h3>
    </div>
    <hr />
    <div className="getting-started-text-box">
      <h2 id="getting-started-text">Go for your first run</h2>
      <h4 style={{color: "#494950"}}>Head over to our Runs page to start your workout. 
        Seemlessly upload your workouts directly to Free Runner!</h4>
      <Button variant="primary" onClick={goToRuns} style={{marginTop: "5px"}}>
        Start Running
      </Button>

    </div>
    <div className="getting-started-text-box">
      <h2 id="getting-started-text">Connect with friends</h2>
      <h4 style={{color: "#494950"}}>Add your family, co-workers, or randoms to compete with over on our leaderboards! </h4>
      <Button variant="primary" onClick={goToFriends} style={{marginTop: "5px"}}>
        Get Connected
      </Button>
    </div>
   </div>
  );

};


export default LoggedInName;
