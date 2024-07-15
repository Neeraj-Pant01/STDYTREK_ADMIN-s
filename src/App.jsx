import React from 'react'
import Homepage from './pages/Homepage.jsx/Homepage'
import Profile from './pages/profile/Profile'
import Navbar from './components/Navbar'
import Footer from './components/footer/Footer'
import {createBrowserRouter, Navigate, Outlet, redirect, RouterProvider, useLocation} from "react-router-dom"
import Blog from './pages/Blog/Blog'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Upload from './pages/upload/Upload'
import Sucess from './pages/upload/Sucess'
import { useSelector } from 'react-redux'

const App = () => {

  const user = useSelector((state)=>state.userReducer.payload)
  // user = true;
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
          element:user ?<Homepage /> : <Navigate to='/login' />
        },
        {
          path: "/profile/:id",
          element:user ? <Profile /> : <Navigate to='/login' />
        },
        {
          path: "/blog",
          element:user ? <Blog /> : <Navigate to='/login' />
        },
        {
          path: '/upload',
          element:user ? <Upload /> : <Navigate to='/login' />
        }
      ]
    },
    {
      path:"/register",
      element:!user ? <Register /> : <Navigate to='/' />
    },
    {
      path: "/login",
      element:!user ? <Login /> : <Navigate to='/' />
    },{
      path: "/success",
      element:user ? <Sucess /> : <Navigate to='/login' />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
