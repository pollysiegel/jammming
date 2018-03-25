/*
 * Get a Spotify user's access token
 * Send a search request to the Spotify API
 * Save a user's playlist to their Spotify account.
 */

const clientId = '698f6e3c806a4a929806c95270ef2c01';
const redirectUri = 'http://localhost:50543/';  /* port # of my locally running Jammming instance */
const fetchAccessTokenURL = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&scope=user-read-private&redirect_uri=' + redirectUri;

let accessToken = '';


let Spotify = {

  /*
   * Retrieve an access token from Spotify
   */

  getAccessToken() {

    /* If we already have an access token, let's use it */

    console.log('Access Token in getAccessToken is ' + accessToken);

    if (accessToken) {
     /* console.log('Access Token found: ' + accessToken); */
      return (accessToken);
    }


    /*
     * Parse the token from our Callback URL, along with
     * the expiration time.
     */

    const returnURL = window.location.href;
    const accessTokenMatch = returnURL.match(/access_token=([^&]*)/);
    const expiresInMatch = returnURL.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {

      let expirationTime = expiresInMatch[1];
      accessToken = accessTokenMatch[1];

      window.setTimeout(() => accessToken = '', expirationTime * 10000);
      window.history.pushState('Access Token', null, '/');
      return (accessToken);

    } else {
      /*
       * No accessToken yet, so let's get one from Spotify. The user will
       * need to authenticate, and after authentication, the access token will
       * be in the URL.
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
    accessToken = Spotify.getAccessToken();

    if (accessToken) {

      const fetchURL = 'https://api.spotify.com/v1/search?type=track&limit=10&q=' + term;
      const headerInfo = {headers: {Authorization: 'Bearer ' + accessToken}};

      console.log('Asking for a search Promise for ', JSON.stringify(term), ' fetchURL is ' + fetchURL + ' HeaderInfo is ' + JSON.stringify(headerInfo));
      return fetch(fetchURL, headerInfo)
        .then(
            response =>  {
            if (response.ok) {
              console.log('Response is okay in search');
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

                return jsonResponse.tracks.items.map(track => {
                  return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                  }
                });
              }
          }
        ) /* then */
    }
    else {
      console.log('Failure to get access token in search');
    }
  },

  savePlaylist(playlistName, tracks) {

    let userID = '';
    accessToken = Spotify.getAccessToken();
    const fetchUseridURL = 'https://api.spotify.com/v1/me';
    const headerInfoGet = {headers: {Authorization: 'Bearer ' + accessToken}, method: 'GET'};
    const playlistPost = {headers: {Authorization: 'Bearer ' + accessToken}, method: 'POST', body: JSON.stringify({'name': playlistName})}

    console.log(headerInfoGet);

    if (accessToken) {
      console.log('Saving playlist for ' + playlistName + ' with tracks ' + JSON.stringify(tracks) + accessToken);
      console.log('Asking for a Promise for ', JSON.stringify(playlistName), ' fetchUseridURL is ' + fetchUseridURL + ' HeaderInfo is ' + JSON.stringify(headerInfoGet));


        return fetch(fetchUseridURL, headerInfoGet).then(
          response =>  {
            if (response.ok) {
              console.log('Response is okay in savePlaylist');
              return response.json();
            }
            throw new Error('savePlaylist request response failed!' + JSON.stringify(response));
          }, networkError => console.log(networkError.message)
        ) /* end then */
        .then(
          jsonResponse => {
            console.log('In Spotify savePlaylist');
            console.log(JSON.stringify(jsonResponse));
            if (!jsonResponse.id) {
              console.log('Did not receive an ID from savePlaylist');
              return '';
            } else {
              /*
               * Save the new playlist name first, then save the tracks.
               */

              userID=jsonResponse.id;
              const setPlaylistURL = 'https://api.spotify.com/v1/users/' + userID + '/playlists?' + JSON.stringify(playlistName);

              console.log('Returning JSON objects from URL: ' + setPlaylistURL);
              console.log('Posting to ' + playlistPost);

              fetch(setPlaylistURL, playlistPost)
                .then (
                  response => {
                    console.log('Saved playlist to Spotify ' + playlistName);
                    if (response.ok) {
                      console.log('Response is okay in savePlaylist');
                      return response.json();
                    }
                    throw new Error('savePlaylist request response failed!');
                  }, networkError => console.log(networkError.message)
                )
                .then(
                  jsonResponsePlaylist => {
                    console.log('In Spotify savePlaylist, saving tracks ');
                    console.log(JSON.stringify(jsonResponsePlaylist));
                    if (!jsonResponsePlaylist.id) {
                      console.log('Did not receive a playlistID from Spotify');
                      return '';
                    } else {
                      const playlistID = jsonResponsePlaylist.id;
                      console.log('Getting tracks for ' + playlistName + ': ' +  playlistID);

                    }
                  }
                )
            }
          }
        ) /* then */
    }
    else {
      console.log('Failure to get access token in savePlaylist');
    }
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