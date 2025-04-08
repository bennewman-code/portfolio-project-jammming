import React, { useState, useContext } from 'react';
import { SongContext } from './SongContext';
import { getUserId, emptyPlaylist } from './authorisation';

const PlayList = () =>  {
    const { addedSongs, setAddedSongs } = useContext(SongContext);
// This function gives the ability to remove songs from the state by filtering out the index given
    const handleClick = (indexToRemove) => {
        setAddedSongs((prevAddedSongs) => prevAddedSongs.filter((_, index) => index !== indexToRemove));
    }
    // the h2 Playlist shows up in both login and logout states (it should only show up when logged in need to fix)
    //the ul bit doesnt work so ill have to try some stuff
    return (
        <div>
            <h2>Playlist</h2>
            <div>
                {addedSongs.map((song, index) => (
                    <div key={ index }>
                        <p>Name: { song[0] }</p>
                        <p>Artist: { song[1].join(', ') }</p>
                        <img src={ song[2].url } width={ song[2].width } height={ song[2].height } alt={ "Cover Art" }/>
                        <button type="button" onClick={ () => handleClick(index) }>-</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

const CreatePlayList = () => {
    const { addedSongs } = useContext(SongContext);
    const [userInput, setUserInput] = useState('');
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }
    const handleClick = async() => {
        const uriArray = []
        if (addedSongs[0] !== undefined) {
            for (let i = 0; i < addedSongs.length; ++i) {
                uriArray.push(addedSongs[i][3]);
            }
        } else {
            return;
        }
        const uri = uriArray.join();
        // so profile awaits the getUserId in auth file that sends and api request for the users profile then profileId takes the user id from that request
        const profile = await getUserId();
        const profileId = profile.id;
        console.log(profileId);
        if (userInput !== '') {
            const createEmptyPlaylist = await emptyPlaylist(profileId, userInput);
            console.log(createEmptyPlaylist);
        } else {
            window.alert("Fill in name before saving playlist!");
            return
        }
        
    }
    return (
        <div>
            <button type="button" onClick={ handleClick }>Save to Spotify</button>
            <h4>Name</h4>
            <input id="searchBar" type="text" onChange={ handleUserInput } value={ userInput } />
        </div>
    )
}

export { PlayList, CreatePlayList };