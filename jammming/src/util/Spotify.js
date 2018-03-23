/*
 * Get a Spotify user's access token
 * Send a search request to the Spotify API
 * Save a user's playlist to their Spotify account.
 */

const clientId = '698f6e3c806a4a929806c95270ef2c01';
const redirectUri = 'https://localhost:50543/';  /* port # of my locally running Jammming instance */
const state = '4432'; /* TODO: Generate and store a random state value, but for now this will do */
const fetchAccessTokenURL = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&redirect_uri=' + redirectUri + '&state=' + state + '&scope=playlist-modify-public';

let accessToken = '';


let Spotify = {

  /*
   * Retrieve an access token from Spotify
   */

  async getAccessToken() {


    /* If we already have an access token, let's use it */

    console.log('Access Token in getAccessToken is ' + accessToken);

    if (accessToken) {
      console.log('Access Token found: ' + accessToken);
      return (accessToken);
    }

    /*
     * Otherwise, we'll fetch an access token from the Spotify API.
     */


    console.log('Fetching access token from ' + fetchAccessTokenURL);
    await fetch(fetchAccessTokenURL)
      .then(response => {
        console.log('Looking at response from getAccessToken');
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed');
      }, networkError => {console.log(networkError.message);})
      .then(jsonResponse => {
        console.log('Response is okay ', JSON.stringify(jsonResponse));

        /*
         * Now parse the information returned in the callback URL, in particular
         * the access token and the expires in.  Compare the state to the state value
         * passed in.
         */
        const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/');
        const expiresInMatch = window.location.href.match('/expires_in=([^&]*)/');
        const returnedState = window.location.href.match('/state=([^&]*)/');

        console.log('accessTokenMatch is ' + accessTokenMatch);
        console.log('access token is' + accessToken);
        console.log('returnedState is ' + returnedState);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            let expirationTime = expiresInMatch[1];
            console.log('expiration time is ' + expirationTime);
            window.setTimeout(() => accessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            console.log('No access token match after return from Spotify API');
        }
      }
    );
  },

  /*
   * Find the tracks that the user has in their playlist. Convert the Promise back into
   * a JSON object, and then extract the relevant information out of it.
   */
  search(term) {

    this.getAccessToken();
    const fetchURL = 'https://api.spotify.com/v1/search?type=track&q=' + term;
    const headerInfo = '{ headers: {Authorization: Bearer ' + accessToken + '}}';

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