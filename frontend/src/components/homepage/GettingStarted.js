import React from 'react';
import image from './homepage-running-image.jpg'

function LoggedInName()
{

  return(
   <div className="homepage-getting-started" id="logged-in-div">
    {/* <img clasName="image" src={ image }></img> */}
    <div className="getting-started-text-box">
      <h1 id="getting-started-text">Lets get started</h1>
      <h3 style={{color: "#494950"}}>We've listed some ways to begin your journey with Free Runner</h3>
    </div>
    <hr stle={{color: "#f0f0f5"}} />
    <div className="getting-started-text-box">
      <h2 id="getting-started-text">Go for your first run</h2>
      <h3 style={{color: "#494950"}}>We've listed some ways to </h3>
    </div>
    <div className="getting-started-text-box">
      <h2 id="getting-started-text">Connect with friends</h2>
      <h3 style={{color: "#494950"}}>We've listed </h3>
    </div>
   </div>
  );

};


export default LoggedInName;
