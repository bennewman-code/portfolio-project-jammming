import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import SearchBar from './searchBar.js';
import { handleLogin } from './login.js';
import { setupTokenRefresh, loginWithSpotifyClick, logoutClick } from './authorisation.js';

function App() {
  useEffect(() => {
    handleLogin();
    setupTokenRefresh();
  }, []);
  useEffect(() => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', loginWithSpotifyClick);
      return () => {
        loginBtn.removeEventListener('click', loginWithSpotifyClick);
      };
    }
  }, []);
  useEffect(() => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logoutClick);
      return () => {
        logoutBtn.removeEventListener('click', logoutClick);
      };
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button id="loginBtn">Login with Spotify</button>
        <button id="logoutBtn">Logout</button>
        <SearchBar />
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
