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
              <img src={`https://picsum.photos/200?random=${board.id}`} alt={board.title} />
              <h2>{board.title}</h2>
              <p className="boardCategory">{board.category}</p>
              <div className="boardButtons">
                <button className="viewBoard">
                  <Link to={`/boards/${board.id}`} className="viewBoard" as="button">View Board</Link>
                </button>
                <button onClick={() => handleOnClick(board.id)} className="delete">Delete</button>
              </div>
            </div>
          ))}
        </>
      ) : ( <h2>No boards to display!</h2> )}
    </div>
  );
};

export default BoardList;
