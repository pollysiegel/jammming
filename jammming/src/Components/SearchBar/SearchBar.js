import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    /*
     * Set new search term
     */

    search(newSearchTerm) {
        this.props.onSearch = newSearchTerm;
    }

    /*
     * When someone enters a new search term, we want to change the search term
     * through the search method.
     */
    handleTermChange(event) {
        this.search(event.target.value);
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <a>SEARCH</a>
            </div>
        )
    }
}

export default SearchBar;