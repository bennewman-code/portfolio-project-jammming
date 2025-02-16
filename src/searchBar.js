import React, { useState } from 'react';

const SearchBar = () => {
    const [userInput, setUserInput] = useState('');
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }
    return (
        <form>
            <input id="searchBar" type="text" onChange={ handleUserInput } value={ userInput } />
        </form>
    )
}

export default SearchBar;