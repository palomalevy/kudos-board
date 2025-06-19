import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CardList from './CardList';

const BoardDetails = () => {
    const { boardID } = useParams();
    const [board, setBoard] = useState({});
    const [cards, setCards] = useState([]);
    
    const fetchBoardData = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${boardID}`);
        const data = await response.json();
        setBoard(data);
    };

    useEffect(() => {
        fetchBoardData();
        const fetchCardsData = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${boardID}/cards`);
            const data = await response.json();
            setCards(data);
        };
        fetchCardsData();
    }, [boardID]);

    const handleDeleteCard = async (cardID) => {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${boardID}/cards/${cardID}`, {
             method: 'DELETE',
        });
        fetchBoardData();
    };

    return (
        <div>
            <h1>{board.title}</h1>
            <CardList cards={cards} handleDeleteCard={handleDeleteCard} boardID={boardID} />
        </div>
    )
}


export default BoardDetails;