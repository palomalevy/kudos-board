import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CardList from './CardList';
import CreateCardForm from './CreateCardForm'
import Header from './Header';
import Footer from './Footer';

const BoardDetails = () => {
    const { boardID } = useParams();
    const [board, setBoard] = useState({});
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false)

    const openPopup = () => {
        setShowModal(true)
    }

    const fetchBoardData = async () => {
        const responseBoard = await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${boardID}`);
        const dataBoard = await responseBoard.json();
        console.log("console data", dataBoard)
        setBoard(dataBoard);
        
        const responseCards = await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${boardID}/cards`);
        const dataCard = await responseCards.json();
        console.log("console data", dataCard)
        setCards(dataCard);
    };


    useEffect(() => {
        fetchBoardData();
    }, [boardID]);

    const handleDeleteCard = async (cardID) => {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${boardID}/cards/${cardID}`, {
             method: 'DELETE',
        });
        fetchBoardData();
    };

    return (
        <div>
            <Header />
            <div className="boardTitle">
                <h2 className="cardListTitle">{board.title}</h2>
            </div>
            <div className="createCard">
                <button className="createCardButton" onClick={openPopup} >Create Card</button>
            </div>
            <CreateCardForm showModal={showModal} setShowModal={setShowModal} boardID={boardID} setCards={setCards} cards={cards} />
            <CardList cards={cards} handleDeleteCard={handleDeleteCard} boardID={boardID} />
            <Footer />
        </div>
    )
}


export default BoardDetails;