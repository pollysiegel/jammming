import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

/*
 * Jammming app, allows you to:
 *  -- search within spotify
 *  -- add tracks to a play list
 *  -- delete tracks from a play list
 *  -- save a play list to Spotify
 */

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state =  {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
      trackUris: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  /*
   * Add a track to the playlist if it isn't already in the playlist
   */

  addTrack(track) {


    let found = false;
    console.log('looking for track ' + track.name);

    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      if (this.state.playlistTracks[i].id === track.id) {
        found = true;
        break;
      }
    }


    /*
     * If the track isn't in the playlist the new track to the playlist. We use the spread operator
     * for efficiency to concatenate the new track to the existing array.
     * setState must be called so that React will update the DOM with the
     * new info and rerender the page.
     */

    if (!found) {

      this.setState({playlistTracks: [...this.state.playlistTracks, track]});

    } else {
      console.log('Track ' + track.name + ' is already in the playlist. Skipping');
    }

  }

  /*
   * Remove track from the playlist. Because we're selecting from
   * tracks within the playlist, the track to be removed will always be found.
   */

  removeTrack(track) {

    let found = false;

    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      if (this.state.playlistTracks[i].id === track.id) {
        this.state.playlistTracks.splice(i, 1);  /* remove the track */
        this.setState({playlistTracks: this.state.playlistTracks});
        found = true;
        break;
      }
    }
    if (!found) {
      console.log('Did not find ' + track.name);
    }
  }

  /*
   * Update the playlistName to the value entered in the search bar
   */

  updatePlaylistName(name) {
    this.setState({playlistName: name});
    console.log('Updated playlistName to ' + name + ': ' + JSON.stringify(this.state.playlistName));
  }

  /*
   * Save a new playlist to Spotify
   */

  savePlaylist() {
    this.state.playlistTracks.map(track => this.state.trackUris.push(track.uri));
    Spotify.savePlaylist(this.state.playlistName, this.state.trackUris)
      .then(
        this.updatePlaylistName('New Playlist'),
        this.setState({searchResults: []})
      )
      .catch(err => console.log('Error in saving playlist:' + err));
  }

  /*
   * Search in Spotify for tracks matching the search term.
   */
  search(searchTerm) {


    /*
     * Retrieve the search results from the Spotify API (through a Promise)
     * Update the state with the new results. setState must be called so
     * React will update the DOM/virtualDOM and display the search results immediately.
     */
    Spotify.search(searchTerm)
      .then(results => this.setState({ searchResults: results}))
      .catch(err => console.log('Error retrieving search results:' + err));

  }

  render() {

    /*
     * TODO: Get an access token if we don't already have one, because it will make the
     * UI/UX so much better. Otherwise, the first time we try to do anything with the Spotify
     * API (either search or update playlist), we'll get an error because we try to access before
     * the authorization has returned.
     */


    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
