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
        <h1>Jammming</h1>
        {isLoggedIn ? (
          <div className='body'>
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
      </header>
    </div>
  );
}

export default App;
