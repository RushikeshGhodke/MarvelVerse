import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'
import Character from './routes/Character.jsx'
import Search from './routes/Search.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />
    },
    {
      path: "/character/:id",
      element: <Character />,
      errorElement: <ErrorPage />
    },
    {
      path: "/search",
      element: <Search />,
      errorElement: <ErrorPage />
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />    
  </React.StrictMode>,
)
