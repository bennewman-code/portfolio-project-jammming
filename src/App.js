import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import SearchComponents from './searchBar.js';
import { PlayList, CreatePlayList } from './playList';
import { setupTokenRefresh, loginWithSpotifyClick, logoutClick, currentToken, handleRedirect } from './authorisation.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      await handleRedirect();
      if (currentToken.access_token) {
        setIsLoggedIn(true);
        setupTokenRefresh();
      }
    };
    checkToken();
  }, []);
  
  const handleLogin = () => {
    loginWithSpotifyClick();
  };

  const handleLogout = () => {
    logoutClick();
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isLoggedIn ? (
          <div>
            <button onClick={ handleLogout }>Logout</button>
            <SearchComponents />
            <CreatePlayList />
            <PlayList />
          </div>
        ) : (
          <div>
            <button onClick={ handleLogin }>Login with Spotify</button>
          </div>
        )}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
