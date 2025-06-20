import React from "react";

const CategoryButtons = ({ boards, setBoards, fetchData, fetchBoardQuery }) => {

//     const sortBoards = (type) => {
//     if (type === 'Inspiration') {
//         fetchBoardQuery('', type)
//     } else if (type === "Celebration") {
        
//     } else if (type === "Thank You") {

//     } else if (type === "All") {
    
//     }
//   }
    const handleFilter = (event) => {
        const option = event.target.value === "All" ? '' : event.target.value

        if (option === "Recent") {
            fetchData()
            setBoards(boards.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6))
        }
        else {
            fetchBoardQuery('', option)
        }
    }

    return (
        <div className='allButtons'>
            <button type="button" value="All" onClick={handleFilter}>All</button>
            <button type="button" value="Recent" onClick={handleFilter}>Recent</button>
            <button type="button" value="Celebration" onClick={handleFilter}>Celebration</button>
            <button type="button" value="Thank You" onClick={handleFilter}>Thank You</button>
            <button type="button" value="Inspiration" onClick={handleFilter}>Inspiration</button>
        </div>
    )
};

export default CategoryButtons;