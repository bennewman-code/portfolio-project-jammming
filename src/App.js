import logo from './logo.svg';
import './App.css';
import SearchBar from './searchBar.js';
import { handleLogin } from './login.js';
import { setupTokenRefresh, loginWithSpotifyClick, logoutClick } from './authorisation.js';

function App() {
  handleLogin();
  setupTokenRefresh();
  document.getElementById('loginBtn').addEventListener('click', loginWithSpotifyClick);
  document.getElementById('logoutBtn').addEventListener('click', logoutClick);

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
