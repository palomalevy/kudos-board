import React, { useState, useEffect } from 'react';


const Card = ({card, handleDelete, voteCount}) => {
    const [voteNum, setVoteNum] = useState(voteCount)

    // const handleLikeButton = () => {
    //     setVoteNum(voteNum + 1)
    //     handleLikeButton(card.id)
    // }

    const handleLikeButton = async () => {
       const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/cards/${card.id}/voteCount`, {
                 method: 'PUT',
        });
        if (response.ok) {
          const checkResponse = await response.json()
          const newVoteCount = checkResponse.voteCount
          setVoteNum(newVoteCount)
        }
      }

  return (
    <div className="card">
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <img className="gifImg" src={card.gifurl} alt={card.title} />
        <p>Author: {card.author}</p>
        <div className="buttons">
            <button onClick={handleLikeButton}>Likes</button>
            <p>{voteNum}</p>
            <button onClick={() => handleDelete(card.id)} className="delete">Delete</button>
        </div>
    </div>
  )
}

export default Card