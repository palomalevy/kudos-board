import React from 'react'
import { Link } from 'react-router';


const CardList = ({ cards, handleDeleteCard, boardID }) => {
  const handleOnClick = (cardID) => {
    handleDeleteCard(cardID);
  };

  return (
      <div className="cardList">
      {cards?.length ? (
        <>
        {cards.map((card) => (
          <div key={card.id} className="card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <img src={card.gifurl} alt={card.title} />
            <p>Author: {card.author}</p>
            <p>Likes: {card.voteCount}</p>
            <div className="cardButton">
              <button onClick={() => handleOnClick(card.id)} className="delete">Delete</button>
            </div>
          </div>
        ))}
        </>
      ) : (
        <h2>No cards to display!</h2>
      )}
    </div>
  );
};

export default CardList;