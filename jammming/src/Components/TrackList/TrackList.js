import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    console.log('TrackList is ' + this.props.tracks);
    return (
      <div className="TrackList">
        {
          /* Renders a set of Track components */
          this.props.tracks.map(track => {
            console.log('the track is' + JSON.stringify(track));
            return <Track track={track} onAdd={this.props.onAdd}  key={track.id} />
          })
        }
      </div>
    );
  }
}

export default TrackList;