import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          /* Renders a set of Track components */
          this.props.tracks.map(track => {
            console.log('the track is' + JSON.stringify(track.name));
            return <Track track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} key={track.id} />
          })
        }
      </div>
    );
  }
}

export default TrackList;