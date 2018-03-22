/*
 * Get a Spotify user's access token
 * Send a search request to the Spotify API
 * Save a user's playlist to their Spotify account.
 */

const clientId = '698f6e3c806a4a929806c95270ef2c01';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';


let Spotify = {

  /*
   * Retrieve an access token from Spotify
   */

  getAccessToken() {

    if (accessToken) {
        return(accessToken);
    }

    const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/');
    const expiresInMatch = window.location.href.match('/expires_in=([^&]*)/');

    if (accessTokenMatch && expiresInMatch) {

      accessToken = accessTokenMatch[1];
      let expirationTime = expiresInMatch[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      window.location.href = 'https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}'
    }
  },

  /*
   * Find the tracks that the user has in their playlist
   */
  search(term) {
    fetch('https://api.spotify.com/v1/search?type=track&q=${term}', {headers: {Authorization: 'Bearer ${accessToken}'}})
      .then(response => response.json()).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }

        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));

    });
  }
};

export default Spotify;