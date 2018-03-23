/*
 * Get a Spotify user's access token
 * Send a search request to the Spotify API
 * Save a user's playlist to their Spotify account.
 */

const clientId = '698f6e3c806a4a929806c95270ef2c01';
const redirectUri = 'http://localhost:50543/';  /* port # of my locally running Jammming instance */
const state = '4432'; /* TODO: Generate and store a random state value, but for now this will do */
const fetchAccessTokenURL = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectUri + '&state=' + state;

let accessToken = '';


let Spotify = {

  /*
   * Retrieve an access token from Spotify
   */

  getAccessToken() {

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

    const returnURL = window.location.href;
    const accessTokenMatch = returnURL.match(/access_token=([^&]*)/);
    const expiresInMatch = returnURL.match(/expires_in=([^&]*)/);
    /*
     * TODO: Get state checking to work
     *
    const returnedState = returnURL.match(/state=([^&]*)/);


    let newState = returnedState[1];

    if (newState === state) {
      console.log('Returned state matches');
    } else {
      console.log('Returned state doesnt match');
    }
    */

    /*
     * Check to see that we got both an access token and expiration time, as well as
     * check the state against returned state to make sure it matches (for security)
     * our original setting.
     */
    if (accessTokenMatch && expiresInMatch) {

      let expirationTime = expiresInMatch[1];
      accessToken = accessTokenMatch[1];
      console.log('expiration time is ' + expirationTime);
      console.log('accessToken is ' + accessToken);

      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return (accessToken);

    } else {

      /*
       * No accessToken yet, so let's get one from Spotify. The user will
       * need to authenticate, and after authentication, the access token will
       * be in the URL for when getAccessToken() is called again.
       */

      window.location = fetchAccessTokenURL;
      console.log('Fetching access token from ' + fetchAccessTokenURL);

    }

  },

  /*
   * Find the tracks that the user has in their playlist. Convert the Promise back into
   * a JSON object, and then extract the relevant information out of it.
   */
  search(term) {

    /*
     * Get the access token or force reauthorization
     */
    accessToken = this.getAccessToken();

    if (accessToken) {

      const fetchURL = 'https://api.spotify.com/v1/search?type=track&limit=10&q=' + term;
      const headerInfo = {headers: {Authorization: 'Bearer ' + accessToken}};

      console.log('Asking for a search Promise for ', JSON.stringify(term), ' fetchURL is ' + fetchURL + ' HeaderInfo is ' + JSON.stringify(headerInfo));
      fetch(fetchURL, headerInfo)
        .then(
           response =>  {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Search request response failed!');
          }, networkError => console.log(networkError.message)
        ) /* end then */
        .then(
          jsonResponse => {
              console.log('In Spotify search');
              console.log(JSON.stringify(jsonResponse));
              if (!jsonResponse.tracks) {
                  return [];
              } else {
                  /*
                  * Extract the track information we're interested in from the JSON response
                  */
                  console.log('Returning JSON objects from search');

                  let newTracks = jsonResponse.tracks.items.map(track => {
                      return {
                          id: track.id,
                          name: track.name,
                          artist: track.artists[0].name,
                          album: track.album.name,
                          uri: track.uri
                      }
                  });

                  console.log('New tracks are ' + JSON.stringify(newTracks));
                  return(newTracks);
              }
          }
        ) /* then */
    }
    else {
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