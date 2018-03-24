import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
    render() {
        /* console.log('In SearchResults -- tracks is ' + JSON.stringify(this.props.searchResults)); */
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}
                           onRemove={this.props.onRemove} />
            </div>
        )
    };
}


export default SearchResults;