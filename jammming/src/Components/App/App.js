import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state =  {
      searchResults: [{
          id: '7gCeodIXjhCLDWC5H1LOmT',
          name: 'Your Song',
          artist: 'Elton John',
          album: 'Elton John',
          uri: 'https://www.spotify.com'
        },
        {
          id: '1T4iwEA2ySieXjWxjiMVWs',
          name: 'Your Wildest Dreams',
          artist: 'Moody Blues',
          album: 'The Other Side of Life',
          uri: 'https://www.spotify.com'
        }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          id: '3kcaix8VptngsWoYDTqEN2',
          name: 'The Story in Your Eyes',
          artist: 'Moody Blues',
          album: 'Every Good Boy Deserves Favour',
          uri: 'https://www.spotify.com'
        },
        {
          id: '7K6xMPtAjTuLPNlJMLf5bS',
          name: 'Another Brick in the Wall, PT. 1',
          artist: 'Pink Floyd',
          album: 'The Wall',
          uri: 'https://www.spotify.com'
        }
      ],
      searchTerm: '',
      trackUris: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.search = this.search.bind(this);
  }

  /*
   * Add a track to the playlist if it isn't already in the playlist
   */

  addTrack(track) {


    let found = false;
    console.log('looking for track ' + track.name);

    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      console.log('In addTrack ' + this.state.playlistTracks[i].name );
      if (this.state.playlistTracks[i].id === track.id) {
        found = true;
        break;
      }
    }

    /* If track isn't in the playlist add it */

    if (!found) {
      console.log('Adding ' + JSON.stringify(track) + ' to the playlist');
      console.log('Playlist is ' + JSON.stringify(this.state.playlistTracks));
      this.state.playlistTracks.push(track);
      console.log('Modified playlist is ' + JSON.stringify(this.state.playlistTracks));

    } else {
      console.log('Track ' + track.name + ' is already in the playlist. Skipping');
    }
  }

  /*
   * Remove track from the playlist. Because we're selecting from
   * tracks within the playlist, it will always be found.
   */

  removeTrack(track) {

    let found = false;

    console.log('Removing track ' + track.name + ' ' + track.id);
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      if (this.state.playlistTracks[i].id === track.id) {
        console.log('Removing track ' + track.name + ' ' + track.id);
        this.state.playlistTracks.splice(i, 1);  /* remove the track */
        found = true;
        break;
      }
    }
    if (!found) {
      console.log('In removeTrack, did not find ' + track.name);
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  /*
   * TODO: This can't be correct. Save playlist should create a set of trackURIs from
   * our playlist, but since we haven't yet connected to Spotify, my assumption is
   * we'll connect this up later.  For now we'll just copy the playlistTracks to the
   * trackURIs; what we really need to do is to do a Spotify lookup to find the trackURI for each
   * element in our playlist.
   */

  savePlaylist() {
    console.log('Saving Playlist');
    this.state.playlistTracks.map(track => this.state.trackUris.push(track.uri));
  }

  updateSearchTerm(newSearchTerm) {
    this.setState({searchTerm: newSearchTerm});
  }

  search() {
    console.log('searching ' + this.state.searchTerm);
    Spotify.search(this.state.searchTerm)
      .then(results => this.setState({ searchResults: results}))
      .catch(err => console.log('There was an error:' + err));
    /* this.setState({ searchResults: Spotify.search(this.state.searchTerm) }); */
    console.log(Spotify.search(this.state.searchTerm));
    console.log('After searching, search Results are ' + JSON.stringify(this.state.searchResults));
  }

  render() {

    /*
     * Get an access token if we don't already have one, because it will make the
     * UI/UX so much better. Otherwise, the first time we perform a function we
     * have to do it twice.
     */


    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} onSearchTermChange={this.updateSearchTerm}/>
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
