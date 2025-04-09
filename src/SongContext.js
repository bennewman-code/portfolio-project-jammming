// Not sure what this does just needed it to use a state in a function i know i learn this not too far ahead tho
import React, { createContext, useState } from 'react';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [addedSongs, setAddedSongs] = useState([]);

  return (
    <SongContext.Provider value={{ addedSongs, setAddedSongs }}>
      {children}
    </SongContext.Provider>
  );
};
