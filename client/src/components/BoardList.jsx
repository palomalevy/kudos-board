import { useEffect, useState } from "react";
import data from "../temp-data/data.js"

const BoardList = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        setBoards(data);
    }, []);

    return (
        <div className='boardList'>
            {boards.map((board) => (
                <div key={board.id} className='boardCard'>
                    <img src={board.coverImage} alt={board.title} />
                    <h2>{board.title}</h2>
                    <p className='boardCategory'>{board.category}</p>
                    <div className='cardButtons'>
                        <button className='viewBoard'>View Board</button>
                        <button className='delete'>Delete</button>
                    </div>
                </div>
        ))}
        </div>
    )
}

export default BoardList;