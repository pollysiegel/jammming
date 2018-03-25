import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    /* console.log('In TrackList, tracks is ' + JSON.stringify(this.props.tracks)); */
    if (this.props.tracks) {
      return (
        <div className="TrackList">
          {
            /* Renders a set of Track components */
            this.props.tracks.map(track => {
              return (
                <Track track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove}
                         key={track.id} />
              );
            })
          }
        </div>
      );
    } else {
        return (
            <div className="TrackList">No tracks to display</div>
        );
    }
  }
}

export default TrackList;