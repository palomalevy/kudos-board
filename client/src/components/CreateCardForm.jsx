import React, { useEffect, useState } from "react";

const CreateCardForm = ({
  cards,
  setCards,
  boardID,
  showModal,
  setShowModal,
  closePopup,
}) => {
  const [gifs, setGifs] = useState([]);
  const [selectedGIF, setSelectedGIF] = useState("");
  const [userInput, setUserInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  }

  const handleTextChange = (event) => {
    const { value } = event.target;
    setUserInput(value);
  };

  const handleSelect = (gifurl) => {
    setSelectedGIF(gifurl);
    setGifs([]);
  };

  const fetchGiphyQuery = async () => {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        import.meta.env.VITE_API_KEY
      }&q=${userInput}&limit=6`
    );
    const searchResults = await res.json();
    setGifs(searchResults.data);
  };

  useEffect(() => {
    if (userInput) {
      fetchGiphyQuery();
    }
  }, [userInput]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCard = {
      boardID: parseInt(boardID),
      title: event.target.title.value,
      description: event.target.description.value,
      gifurl: selectedGIF,
      author: event.target.author.value,
      voteCount: 0,
    };
    fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${boardID}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        setCards((prevCards) => {
          const safePrev = Array.isArray(prevCards) ? prevCards : [];
          return [...safePrev, data];
        });
        setGifs([]);
        setTitle("");
        setSelectedGIF("");
        setUserInput("");
        closePopup();
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <section className={`popup ${showModal ? "visible" : "notVisible"}`}>
        <button className="closeButton" onClick={() => setShowModal(false)}>
          x
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="header">Create Kudos Card !!</h2>
          <label>
            Title: <input type="text" name="title" value={title} onChange={handleTitleChange}/>
          </label>
          <label>
            Description: <textarea name="description"/>
          </label>
          <label>
            Search GIFS:{" "}
            <input
              type="text"
              onChange={handleTextChange}
              name="gifurl"
              placeholder="Search for GIFs..."
            />
          </label>
          <div className="gifContainter">
            {gifs.map((gif) => {
              return (
                <img
                  onClick={() => handleSelect(gif.images.original.url)}
                  key={gif.id}
                  src={gif.images.original.url}
                  width="200"
                  height="110"
                  className="giphy-embed"
                ></img>
              );
            })}
          </div>
          {selectedGIF && <img src={selectedGIF} />}
          <label>
            Author: <input type="text" name="author" />
          </label>
          <button className="popupButton" type="submit">
            Create Card
          </button>
        </form>
      </section>
      <div className={`overlay ${showModal ? "visible" : "notVisible"}`}></div>
    </>
  );
};

export default CreateCardForm;
