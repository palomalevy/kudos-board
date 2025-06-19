import { useEffect, useState } from "react";
import { Link } from 'react-router'
// import data from "../temp-data/data.js"

const BoardList = ({ boards, handleDeleteBoard }) => {
  const handleOnClick = (boardID) => {
    handleDeleteBoard(boardID);
  };
  return (
    <div className="boardList">
      {boards.length ? (
        <>
          {boards.map((board) => (
            <div key={board.id} className="boardCard">
              <img src={board.coverImage} alt={board.title} />
              <h2>{board.title}</h2>
              <p className="boardCategory">{board.category}</p>
              <div className="cardButtons">
                <Link to={`/boards/${board.id}`} className="viewBoard">View Board</Link>
                <button
                  onClick={() => handleOnClick(board.id)}
                  className="delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h2>No boards to display!</h2>
      )}
    </div>
  );
};

export default BoardList;
