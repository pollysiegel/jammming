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
          id: 1,
          name: 'My Song',
          artist: 'Elton John',
          album: 'Madman Across the Water',
          uri: ''
        },
        {
          id: 2,
          name: 'Your Song',
          artist: 'Moody Blues',
          album: 'The Moody Blues',
          uri: ''
        }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          id: 2,
          name: 'Your Song',
          artist: 'Moody Blues',
          album: 'The Moody Blues',
          uri: ''
        },
        {
          id: 3,
          name:'Hello',
          artist: 'You Guys',
          album: 'Goodbye',
          uri: ''
        },
        {
          id: 4,
          name: 'Another brick in the wall',
          artist: 'Pink Floyd',
          album: 'The Wall',
          uri: ''
        }
      ],
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
    this.state.playlistTracks.map(track => {
      return(this.trackUris.push(track));
    });
  }

  search(searchTerm) {
    /* this.setState({ searchResults: Spotify.search(searchTerm) }); */
    console.log('searching ' + searchTerm)
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}  />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
