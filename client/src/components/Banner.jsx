import React, {useState} from 'react'
import Search from './Search'
import CategoryButtons from './CategoryButtons'
import CreateBoardForm from './CreateBoardForm'


const Banner = ({fetchBoardQuery, boards, setBoards, fetchData}) => {
  const [showModal, setShowModal] = useState(false)

  const openPopup = () => {
        setShowModal(true)
    }

  return (
    <section className='banner'>
        <div className='search-bar'>
          <Search fetchBoardQuery={fetchBoardQuery} />
        </div>
        <div className='buttonBanner'>
          <CategoryButtons boards={boards} setBoards={setBoards} fetchData={fetchData} fetchBoardQuery={fetchBoardQuery}/>
        </div>
        <button onClick={openPopup} className="createBoardButton">Create Board</button>
        <CreateBoardForm showModal={showModal} setShowModal={setShowModal} setBoards={setBoards}/>
    </section>
  )
}

export default Banner