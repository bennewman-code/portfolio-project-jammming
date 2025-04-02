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
    // This if statement stops an error when not having any searchResults causing the code to think its redundent
    if (!searchResults || !searchResults.tracks || !searchResults.tracks.items) {
        return null;
    }
    const tracksArray = searchResults.tracks.items;
    const songName = [];
    const ArtistsName = [];
    // First for loop runs through the items Array pushes the songNames to an array
    for (let i = 0; i < tracksArray.length; ++i) {
        songName.push(tracksArray[i].name);
        const tempArtistsName = [];
        // Second for loop is supposed to push artistsNames to the array outside but I think it has to be in previous for loops
        for (let e = 0; e < tracksArray[i].artists.length; ++e) {
            tempArtistsName.push(tracksArray[i].artists[e].name);
        }
        ArtistsName.push(tempArtistsName);     
    }
    console.log(searchResults);
    /*return (
        <div>
            { ArtistsName }
        </div>
    )*/
}

export default SearchComponents;