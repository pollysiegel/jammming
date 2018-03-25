import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

/*
 * Display search results
 */
class SearchResults extends React.Component {
  render() {
    /* console.log('In SearchResults -- tracks is ' + JSON.stringify(this.props.searchResults)); */
    if (this.props.searchResults.length === 0) {
      return (
        <div className="SearchResults">
          <h2>Results</h2>
          <div className="Track">
            <span className="Track-information">No results to display.</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="SearchResults">
          <h2>Results</h2>
          <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}
            onRemove={this.props.onRemove} />
        </div>
      )
    }
  };
}


export default SearchResults;