import React from 'react';
import './Track.css';

class Track extends React.Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
    }

    renderAction() {
        /*
         * Either removeTrack or addTrack will be set by the parent, not both.
         */
        if (this.props.onRemove) {
            return <span onClick={this.removeTrack}>-</span>
        } else {
            return <span onClick={this.addTrack}>+</span>
        }
    };

    /* Add a new track to the Playlist through the function passed in */

    addTrack() {
        console.log('Adding track');
        this.props.onAdd(this.props.track);
    }

    /* Remove this track from the playlist */

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className="Track-action">{this.renderAction()}</a>
            </div>
        )
    };
}

export default Track;



