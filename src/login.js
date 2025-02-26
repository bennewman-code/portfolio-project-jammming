import { redirectToSpotifyAuthorize, getToken, currentToken } from './authorisation.js';

async function handleLogin() {

const args = new URLSearchParams(window.location.search);
const code = args.get('code');

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace('?', '');
  window.history.replaceState({}, document.title, updatedUrl);
}

// Otherwise we're not logged in, login
if (!currentToken.access_token) {
    redirectToSpotifyAuthorize();
} else {
    console.log('User is logged in');
}
}

export { handleLogin };