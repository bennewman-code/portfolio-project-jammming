import React, { useState } from 'react';

const input = () => {
    const [userInput, setUserInput] = useState('');
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }
}

export default input;