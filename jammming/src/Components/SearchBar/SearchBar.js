import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  /*
   * Search when the user clicks Search
   */

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  /*
   * When someone enters a new search term, store it. Since we're storing every key
   * stroke, continue to store the search term each time this routine is called.
   */
  handleTermChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;