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
          playListName: 'My Playlist',
          playListTracks: [
              {name:'Hello',
               artist: 'You Guys',
               album: 'Goodbye'
                },
              {name: 'Another brick in the wall',
              artist: 'Pink Floyd',
              album: 'The Wall'}
              ]
      };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} />
              <Playlist playListName={this.state.playListName} playListTracks={this.state.playListTracks} />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
