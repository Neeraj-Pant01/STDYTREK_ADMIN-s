import React from 'react'
import Homepage from './pages/Homepage.jsx/Homepage'
import Profile from './pages/profile/Profile'
import Navbar from './components/Navbar'
import Footer from './components/footer/Footer'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import Blog from './pages/Blog/Blog'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Upload from './pages/upload/Upload'

const App = () => {

  const Layout = () =>{
    return (
      <>
      <Navbar />
      <Outlet />
      <Footer />
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout />,
      children : [
        {
          path:"/",
          element: <Homepage />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
        {
          path: "/blog",
          element:<Blog />
        },
        {
          path: '/upload',
          element: <Upload />
        }
      ]
    },
    {
      path:"/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
