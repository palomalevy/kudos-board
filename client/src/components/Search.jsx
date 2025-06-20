import React, { useEffect, useState } from 'react'

const Search = ({fetchBoardQuery}) => {
    const [userInput, setUserInput] = useState('')

    const handleTextChange = (event) => {
        const { value } = event.target
        setUserInput(value);
    }

    // useEffect that tracks userInput
        // call fetchBoardQuery and pass userInput into it

    useEffect (() => {
        if (!userInput) fetchBoardQuery(userInput, '');
    }, [userInput])

    const handleSubmit = () => {
        fetchBoardQuery(userInput, '');
    }
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
            return;
        }
    };

    const handleReset = () => {
        setUserInput('');
    }

    return (
        <div>
            <div className='buttons'>
                <input  className='searchBar' type='text' onChange={handleTextChange} onKeyDown={handleKeyDown} placeholder=' Search for boards...' value={userInput}/>
                <button onClick={handleSubmit} className='Submit'>Submit</button>
                <button onClick={handleReset} className='Clear'>Clear</button>
            </div>
        </div>
        )
};

export default Search;