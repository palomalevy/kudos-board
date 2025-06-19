import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';
import Search from './components/Search';
import CategoryButtons from './components/CategoryButtons';
import BoardList from './components/BoardList';

const App = () => { 
  const [boards, setBoards] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/api/boards`)
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

  // const boardID = 1; // Replace with the actual board ID
  //   fetch(`http://localhost:3000/api/boards/${boardID}`)
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  
  const handleDeleteBoard = async (boardID) => {
    await fetch(`http://localhost:3000/api/boards/${boardID}`, {
      method: 'DELETE'
    })
    fetchData();
  }
  return (
    <div className="App">
        <Header/>
      <div className='banner'>
        <div className='search-bar'>
          <Search/>
        </div>
        <div className='buttonBanner'>
          <CategoryButtons/>
        </div>
      </div>
      <div>
        <BoardList boards={boards} handleDeleteBoard={handleDeleteBoard}/>
      </div>
      <footer>
        <p>© 2025 Kudoboard</p>
        <p>Paloma Levy</p>
      </footer>
    </div>
  )  
};

export default App;