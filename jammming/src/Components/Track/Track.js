import React from 'react';
import './Track.css';

class Track extends React.Component {

    renderAction() {
        if(this.props.isRemoval) {
            return <span>-</span>
        } else {
            return <span>+</span>
        }
    };

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className="Track-action">Track Action</a>
            </div>
        )
    };
}

export default Track;



