import React, { useState } from 'react';

const CreateBoardForm = ({ setBoards }) => {
    const [createNew, setCreateNew] = useState({
        title: '',
        category: '',
        coverImage: '',
    });

    const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`${import.meta.env.VITE_BASE_URL}/api/boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createNew),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data); setBoards(prev => [...prev, data])})
      .catch((error) => console.error(error));
    };

    const handleChange = (event) => {
        setCreateNew({ ...createNew, [event.target.name]: event.target.value });
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={createNew.title} onChange={handleChange} />
            </label>
            <label>
                Category:
                <input type="text" name="category" value={createNew.category} onChange={handleChange} />
            </label>
            <label>
                Cover Image:
                <input type="text" name="coverImage" value={createNew.coverImage} onChange={handleChange} />
            </label>
            <button type="submit">Create Board</button>
        </form>
    )
};

export default CreateBoardForm;