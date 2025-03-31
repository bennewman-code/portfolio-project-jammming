import React, { useState } from 'react';
import { getSearchResult } from './authorisation';

const SearchComponents = () => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div>
          <SearchBar setSearchResults={setSearchResults} />
          <Results searchResults={searchResults} />
        </div>
      );
} 

const SearchBar = ({ setSearchResults }) => {
    const [userInput, setUserInput] = useState('');
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }
    const handleSearch = async(e) => {
        e.preventDefault();
        if (userInput.trim()) {
            const searchTerm = userInput
            const results = await getSearchResult(searchTerm);
            setSearchResults(results);
        }
    };
    return (
        <form onSubmit={ handleSearch }>
            <input id="searchBar" type="text" onChange={ handleUserInput } value={ userInput } />
            <button id="searchButton" type="submit">Search</button>
        </form>
    )
}

const Results = ({ searchResults }) => {
   /* const tracksArray = Object.keys(searchResults.items);
    for (let i = 0; i < tracksArray.length; ++i) {
        console.log(tracksArray.i);
    }*/
    console.log(searchResults);
}

export default SearchComponents;