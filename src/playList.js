import React, { useContext } from 'react';
import { SongContext } from './SongContext';

const PlayList = () =>  {
    const { addedSongs, setAddedSongs } = useContext(SongContext);
    console.log(addedSongs);
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



export default PlayList;