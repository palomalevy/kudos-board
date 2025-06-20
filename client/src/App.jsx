import { useEffect, useState } from 'react'
import { Outlet } from 'react-router';
import './App.css'
import Header from './components/Header';
import Search from './components/Search';
import CategoryButtons from './components/CategoryButtons';
import BoardList from './components/BoardList';
import CreateBoardForm from './components/CreateBoardForm';

const App = () => { 
  const [boards, setBoards] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards`)
    const data = await response.json()
    if (Array.isArray(data)) { 
      setBoards([...data])
    } else {
      setBoards([])
    }
  }
    useEffect(() => {
        fetchData()
    }, []);


  // State that tracks active search content
  // State that tracks active filter option
  // Pass both of these down with their setters to Search an Category Buttons WITH fetchBoardQuery function
  // Any change either of them makes in the setter is tracked in the other because they share the same state

  const handleDeleteBoard = async (boardID) => {
    await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${boardID}`, {
      method: 'DELETE'
    })
    fetchData();
  }

  const fetchBoardQuery = async (search = '', category) => {
      const searchURL = `${import.meta.env.VITE_BASE_URL}/api/boards?query=${search}&category=${category}`;
      const response = await fetch(searchURL);
      const data = await response.json();
      const boards = data;
      setBoards(boards);
    };

  return (
    <div className="App">
        <Header/>
      <div className='banner'>
        <div className='search-bar'>
          <Search fetchBoardQuery={fetchBoardQuery}/>
        </div>
        <div className='buttonBanner'>
          <CategoryButtons boards={boards} setBoards={setBoards} fetchData={fetchData} fetchBoardQuery={fetchBoardQuery}/>
        </div>
        <div className='createNew'>
          <CreateBoardForm setBoards={setBoards}/>
        </div>
      </div>
      <div>
        <BoardList boards={boards} handleDeleteBoard={handleDeleteBoard}/>
      </div>
      <footer>
        <p>© 2025 Kudoboard</p>
        <p>Paloma Levy</p>
      </footer>
      <Outlet />
    </div>
  )  
};

export default App;