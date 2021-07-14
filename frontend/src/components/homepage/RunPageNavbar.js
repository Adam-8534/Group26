import React from 'react';

const RunPageNavbar = () => {
  const doLogout = event => 
  {
    event.preventDefault();

    localStorage.removeItem("user_data")
    window.location.href = '/';

  };

  return (
    <nav className="navbar">
      <h1>FREE RUNNER</h1>
      <div className="links">
        <a href="/homepage">Home</a>
        <a href="">Runs</a>
        <a href="/friends">Friends</a>
        <a className="logout-button" onClick={doLogout}>Log out</a>
      </div>
    </nav>
  );
}

export default RunPageNavbar;