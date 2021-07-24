import React from 'react';
import { Button } from 'react-bootstrap';

const RunPageNavbar = () => {
  const doLogout = event => 
  {
    event.preventDefault();

    localStorage.removeItem("user_data")
    window.location.href = '/';

  };

  return (
    <nav className="navbar">
      <h1 style={{marginBottom: "0px"}}>FREE RUNNER</h1>
      <div className="links">
        <a href="/homepage">Home</a>
        <a href="">Runs</a>
        <a href="/friends">Friends</a>
        
        <Button className="logout-button" onClick={doLogout}>
          Log out
        </Button>
        {/* <a className="logout-button" onClick={doLogout}>Log out</a> */}
      </div>
    </nav>
  );
}

export default RunPageNavbar;