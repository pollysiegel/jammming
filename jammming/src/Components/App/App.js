import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      searchResults: [{
          name: 'My Song',
          artist: 'Elton John',
          album: 'Madman Across the Water'
        },
        {
          name: 'Your Song',
          artist: 'Moody Blues',
          album: 'The Moody Blues'
        }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          name:'Hello',
          artist: 'You Guys',
          album: 'Goodbye'
        },
        {
          name: 'Another brick in the wall',
          artist: 'Pink Floyd',
          album: 'The Wall'
        }
      ],
      trackURIs: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {

    /* TODO: Ask about id property of track. I have no idea what they're talking about */

    let i = 0;
    let found = 0;
    while (i < this.state.playlistTracks.length && !found) {
      if (this.state.playlistTracks[i].name === track.name) {
        found = 1;  /* Track is already in the playlist */
      }
    }

    /* If track isn't in the playlist add it */

    if (!found) {
      this.state.playlistTracks.push(track);
    }
  }

  removeTrack(track) {
    let i = 0;
    let found = 0;
    while (i < this.state.playlistTracks.length && !found) {
      if (this.state.playlistTracks[i].name === track.name) {
        found = 1;  /* Track is already in the playlist */
      }
    }

    /* If we find the track in our playlist, remove it from the playlist */

    if (found) {
      this.state.playlistTracks.splice(i, 1);
    }
  }

  updatePlaylistName(name) {
    this.state.playlistName = name;
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
      this.trackURIs.push(track);
    });
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onSearch={this.search} />
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
