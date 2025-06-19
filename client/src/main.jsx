import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import BoardDetails from './components/BoardDetails.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={routes} /> */}
    <Router>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/boards/:boardID' element={<BoardDetails />}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
