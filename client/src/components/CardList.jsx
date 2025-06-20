import React from 'react'
import { Link } from 'react-router';
import Card from './Card';


const CardList = ({ cards, handleDeleteCard, boardID }) => {
  const handleDelete = (cardID) => {
    handleDeleteCard(cardID);
  };

  return (
      <div className="cardList">
      {cards?.length ? (
        <>
        {cards.map((card) => (
          <Card key={card.id} voteCount={card.voteCount} handleDelete={handleDelete} card={card} />
        ))}
        </>
      ) : (
        <h2>No cards to display!</h2>
      )}
    </div>
  );
};

export default CardList;