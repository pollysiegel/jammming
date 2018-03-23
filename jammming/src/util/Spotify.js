/*
 * Get a Spotify user's access token
 * Send a search request to the Spotify API
 * Save a user's playlist to their Spotify account.
 */

const clientId = '698f6e3c806a4a929806c95270ef2c01';
const redirectUri = 'http://localhost:50543/';  /* port # of my locally running Jammming instance */
const state = '4432'; /* TODO: Generate and store a random state value, but for now this will do */
const fetchAccessTokenURL = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&redirect_uri=' + redirectUri;

let accessToken = '';


let Spotify = {

  /*
   * Retrieve an access token from Spotify
   */

  getAccessToken() {

    const headerInfo = { method: 'GET', mode: 'no-cors' }; /* Avoid CORS error */


    /* If we already have an access token, let's use it */

    console.log('Access Token in getAccessToken is ' + accessToken);

    if (accessToken) {
      console.log('Access Token found: ' + accessToken);
      return (accessToken);
    }

    /*
     * See if we already have a token in our Callback URL, and parse out the
     * access token and expiration time.
     */

    const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/');
    const expiresInMatch = window.location.href.match('/expires_in=([^&]*)/');
    const returnedState = window.location.href.match('/state=([^&]*)/');

    console.log('accessTokenMatch is ' + accessTokenMatch);
    console.log('access token is' + accessToken);

    if (accessTokenMatch && expiresInMatch) {

      let expirationTime = expiresInMatch[1];
      accessToken = accessTokenMatch[1];
      console.log('expiration time is ' + expirationTime);

      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');

    } else {

      /*
       * No accessToken yet, so let's get one from Spotify. The user will
       * need to authenticate, and after authentication, the access token will
       * be in the URL for when getAccessToken() is called again.
       */

      window.location = fetchAccessTokenURL;
      console.log('Fetching access token from ' + fetchAccessTokenURL);

    }

    return (accessToken);

  },

  /*
   * Find the tracks that the user has in their playlist. Convert the Promise back into
   * a JSON object, and then extract the relevant information out of it.
   */
  search(term) {

    if ((accessToken = this.getAccessToken())) {

      const fetchURL = 'https://api.spotify.com/v1/search?type=track&q=' + term;
      const headerInfo = {headers: {Authorization: 'Bearer ' + accessToken}};

      console.log('Asking for a search Promise, fetchURL is ' + fetchURL + 'headerInfo is ' + JSON.stringify(headerInfo));
      fetch(fetchURL, headerInfo)
        .then(response => response.json()).then(jsonResponse => {
          console.log('In Spotify search');
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
    } else {
      console.log('Cannot get access token in search');
      return(false);
    }
  },

  savePlaylist(playlistName, tracks) {

    if((accessToken = this.getAccessToken())) {
      if (!playlistName || !tracks) {
        console.log("Error in savePlaylist -- ");
        if (!playlistName) {
          console.log("Playlist name not set");
        } else {
          console.log("No tracks");
        }
        return(false);
      }
    } else {
      console.log('Access Token not set in savePlaylist');
      return(false);
    }

  }
};

export default Spotify;