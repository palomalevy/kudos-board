import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import InsideList from './components/InsideList.jsx'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/boards/:boardID',
    element: <InsideList />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
    {/* <App /> */}
  </React.StrictMode>,
)