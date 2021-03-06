import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  /*
   * Set Playlist name to new name.
   */

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }


  render() {
    /* console.log('In Playlist, tracks are ' + JSON.stringify(this.props.playlistTracks)); */
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>

    )
  }
}

export default Playlist;
