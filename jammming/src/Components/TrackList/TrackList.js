import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {
                    /* You will add a map method that renders a set of Track components */
                    this.props.tracks.map(track => {
                        console.log('the track is' + JSON.stringify(track));
                        return <Track track={track} onAdd={this.props.tracks.onAdd} />
                    })
                }
            </div>
        );
    }
}

export default TrackList;