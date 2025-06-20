import React, { useState } from 'react';

const CreateBoardForm = ({ setBoards, showModal, setShowModal }) => {
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
      .then((data) => {console.log("Inside create board form."); console.log(data); setBoards(prev => [...prev, data])})
      .catch((error) => console.error(error));
    };

    const handleChange = (event) => {
        setCreateNew({ ...createNew, [event.target.name]: event.target.value });
    };

    return (
        <>
        <section className={`popup ${showModal ? "visible" : "notVisible"}`}>
            <button className='closeButton' onClick={() => setShowModal(false)}>x</button>
            <form onSubmit={handleSubmit}>
                <h2>Create Kudos Board !!</h2>
                <label>
                    Title: <input type="text" name="title" value={createNew.title} onChange={handleChange} />
                </label>
                <label>
                    Category: <select name="category" value={createNew.category} onChange={handleChange}>
                        <option value="">Select a category</option>
                        <option value="Celebration">Celebration</option>
                        <option value="Inspiration">Inspiration</option>
                        <option value="Thank You">Thank You</option>
                    </select>
                </label>
                {/* <label>
                    Cover Image: <input type="text" name="coverImage" value={createNew.coverImage} onChange={handleChange} />
                </label> */}
                <label>
                    Author <input type="text" name="author" placeholder="(Optional)..." value={createNew.author} onChange={handleChange} />
                </label>
                <button className="popupButton" type="submit">Create Board</button>
            </form>
        </section>
        <div className={`overlay ${showModal ? "visible" : "notVisible"}`}></div>
        </>
        
    )
};

export default CreateBoardForm;