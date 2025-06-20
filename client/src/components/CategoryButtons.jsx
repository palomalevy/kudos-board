import React from "react";

const CategoryButtons = ({ boards, setBoards, fetchData, fetchBoardQuery }) => {

    const handleFilter = async (event) => {
        const option = event.target.value === "All" ? '' : event.target.value

        if (option === "Recent") {
            await fetchData()
            setBoards(boards.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6))
        }
        else {
            fetchBoardQuery('', option)
        }
    }

    return (
        <div className='allButtons'>
            <button className="categoryButton" type="button" value="All" onClick={handleFilter}>All</button>
            <button className="categoryButton" type="button" value="Recent" onClick={handleFilter}>Recent</button>
            <button className="categoryButton" type="button" value="Celebration" onClick={handleFilter}>Celebration</button>
            <button className="categoryButton" type="button" value="Thank You" onClick={handleFilter}>Thank You</button>
            <button className="categoryButton" type="button" value="Inspiration" onClick={handleFilter}>Inspiration</button>
        </div>
    )
};

export default CategoryButtons;