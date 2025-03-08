import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar.js';
import { setupTokenRefresh, loginWithSpotifyClick, logoutClick, currentToken, handleRedirect } from './authorisation.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    handleRedirect();
    if (currentToken.access_token) {
      setIsLoggedIn(true);
      setupTokenRefresh();
    }
  }, []);
  useEffect(() => {
    const login = () => {
      loginWithSpotifyClick();
      setIsLoggedIn(true);
    }
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', login);
      return () => {
        loginBtn.removeEventListener('click', login);
      };
    }
  }, []);
  useEffect(() => {
    const logout = () => {
      logoutClick();
      setIsLoggedIn(false);
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logout);
      return () => {
        logoutBtn.removeEventListener('click', logout);
      };
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isLoggedIn ? (
          <div>
            <button id="logoutBtn">Logout</button>
            <SearchBar />
          </div>
        ) : (
          <div>
            <button id="loginBtn">Login with Spotify</button>
            <button id="logoutBtn">Logout</button>
            <SearchBar />
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
