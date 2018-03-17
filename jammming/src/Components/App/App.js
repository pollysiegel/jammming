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
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
