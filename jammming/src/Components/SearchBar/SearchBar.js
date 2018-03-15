import React from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"/>
                <a>SEARCH</a>
            </div>
        )
    };
}