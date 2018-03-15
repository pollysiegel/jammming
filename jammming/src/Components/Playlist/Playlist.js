import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

export class Playlist extends Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} />
                <!-- Add a TrackList component -->
                /* <TrackList /> */
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>

        )
    };
}

