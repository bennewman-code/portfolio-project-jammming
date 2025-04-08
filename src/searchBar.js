import React, { useState, useContext } from 'react';
import { getSearchResult } from './authorisation';
import { SongContext } from './SongContext';
// This function is the parent function of searchBar and Results it was needed because Results needed the reults inside SearchBar
const SearchComponents = () => {
    const [searchResults, setSearchResults] = useState([]);
    // Originally was using the same as above but thats local apparently, so i had to use this below
    const { setAddedSongs } = useContext(SongContext);

    return (
        <div>
          <SearchBar setSearchResults={ setSearchResults } />
          <Results searchResults={ searchResults } setAddedSongs={ setAddedSongs } />
        </div>
      );
} 
// The first part of this function makes it so the searchBar updates straight away 
const SearchBar = ({ setSearchResults }) => {
    const [userInput, setUserInput] = useState('');
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }
    // This second function handles taking the users input then using the getSearchResult in authorisation
    const handleSearch = async(e) => {
        e.preventDefault();
        if (userInput.trim()) {
            const searchTerm = userInput
            const results = await getSearchResult(searchTerm);
            setSearchResults(results);
        }
    };
    // The return sets the searchBar on the dom
    return (
        <form onSubmit={ handleSearch }>
            <input id="searchBar" type="text" onChange={ handleUserInput } value={ userInput } />
            <button id="searchButton" type="submit">Search</button>
        </form>
    )
}

const Results = ({ searchResults, setAddedSongs }) => {
    // This if statement stops an error when not having any searchResults causing the code to think its redundent
    if (!searchResults || !searchResults.tracks || !searchResults.tracks.items) {
        return null;
    }
    const tracksArray = searchResults.tracks.items;
    const artistsName = [];
    const songPackage = [];
    // First for loop runs through the length of tracksArray
    for (let i = 0; i < tracksArray.length; ++i) {
        const tempArtistsName = [];
        // Second for loop, loops through the artists and adds them to separate arrays
        for (let e = 0; e < tracksArray[i].artists.length; ++e) {
            tempArtistsName.push(tracksArray[i].artists[e].name);
        }
        artistsName.push(tempArtistsName);
        // Originally had another for loop but relised you can put at the end of the first for loop and it will loop same amount of times
        // Also originally added more arrays for the name, cover art and song uri but found it as waste of space since you can just push it straight to songPackage   
        songPackage.push([tracksArray[i].name, artistsName[i], tracksArray[i].album.images[0], tracksArray[i].uri]);  
    }
    // The setAddedSongs in handleClick using prevAddedSongs allows the state to add multiple songs to the state
    const handleClick = (e, index) => {
        setAddedSongs((prevAddedSongs) => [...prevAddedSongs, songPackage[index]]);
        console.log(e, index);
    }
    // These two console logs show SearchResults so what we get back then songPackage shows the manipulated data from searchResults that we needed 
    // console.log(songPackage);
    // console.log(searchResults);
    // Used map as the return to go through the songPackage Array and unpackage the data into useful jsx
    // it works by iterating over the songPackage array then using the call back function on each element (the call back functions arugments are the song, Index)
    return (
        <div> 
            {songPackage.map((song, index) => (
                <div key={ index }>
                    <p>Name: { song[0] }</p>
                    <p>Artist: { song[1].join(', ') }</p>
                    <img src={ song[2].url } width={ song[2].width } height={ song[2].height } alt={ "Cover Art" }/>
                    <button type="button" onClick={ (e) => handleClick(e, index) }>+</button>
                </div>
            ))}
        </div>
    )
}

export default SearchComponents;