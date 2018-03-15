import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

export class SearchResults extends Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <!-- Add a TrackList component -->
                <TrackList />
            </div>
        )
    };
}


