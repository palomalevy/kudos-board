import React, { useEffect, useState } from 'react'

const Search = () => {
    const [userInput, setUserInput] = useState('')

    const handleTextChange = (event) => {
        const {value} = event.target
        setUserInput(value)
    }
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            return;
        }
    };

    const handleReset = () => {
        setUserInput('');
        onClearing();
    }

    return (
        <div>
            <div className='buttons'>
                <input  className='searchBar' type='text' onChange={handleTextChange} onKeyDown={handleKeyDown} placeholder='Search for movies...' value={userInput}/>
                <button className='Submit'>Submit</button>
                <button onClick={handleReset} className='Clear'>Clear</button>
            </div>
        </div>
        )
};

export default Search;