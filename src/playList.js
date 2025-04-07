import React, { useContext } from 'react';
import { SongContext } from './SongContext';

const PlayList = () =>  {
    const { addedSongs } = useContext(SongContext);
    // the h2 Playlist shows up in both login and logout states (it should only show up when logged in need to fix)
    //the ul bit doesnt work so ill have to try some stuff
    /*return (
        <div>
            <h2>Playlist</h2>
            <ul>
                {addedSongs.map((song, index) => (
                    <li key={ index }>{ song[0] }</li>
                ))}
            </ul>
        </div>
    )*/
}



export default PlayList;