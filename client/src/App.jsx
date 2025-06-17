import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';
import Search from './components/Search';
import CategoryButtons from './components/CategoryButtons';
import BoardList from './components/BoardList';

const App = () => { 
  return (
    <div className="App">
      <header>
        <Header/>
      </header>
      <div className='banner'>
        <div className='search-bar'>
          <Search/>
        </div>
        <div className='buttonBanner'>
          <CategoryButtons/>
        </div>
      </div>
      <div>
        <BoardList/>
      </div>
      <footer>
        <p>© 2025 Kudoboard</p>
        <p>Paloma Levy</p>
      </footer>
    </div>
  )  
};

export default App;