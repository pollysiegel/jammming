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

      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');

      window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectUri;
    }
  },

  /*
   * Find the tracks that the user has in their playlist. Convert the Promise back into
   * a JSON object, and then extract the relevant information out of it.
   */
  search(term) {
    const fetchURL = 'https://api.spotify.com/v1/search?type=track&q=' + term;
    const headerInfo = '{ headers: {Authorization: Bearer ' + accessToken + '}}';
      fetch(fetchURL, headerInfo)
      .then(response => response.json()).then(jsonResponse => {
        console.log(jsonResponse);
        if (!jsonResponse.tracks) {
          return [];
        }

      /*
       * Extract the track information we're interested in from the JSON response
       */

      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName, tracks) {
    if (!playlistName || !tracks) {
      console.log("Error in savePlaylist -- ");
      if (!playlistName) {
        console.log("Playlist name not set");
      } else {
        console.log("No tracks");
      }
      return(false);
    }
  }
};

export default Spotify;