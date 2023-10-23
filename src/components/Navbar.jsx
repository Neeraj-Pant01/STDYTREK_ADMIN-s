import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex bg-purple-500 m-0 p-0 py-5 px-10 sticky top-0 z-30 text-white justify-between'>
      <Link to={'/'}><img src="/mainlogo.png" alt="" className='flex w-20 cursor-pointer' /></Link>
      <div className='flex gap-10 items-center'>
        <Link to={'/blog'}>Blog</Link>
        <Link to={`/upload`}>upload</Link>
      </div>
      <Link to={'/profile/:123'}>
      <img src='no.png' className='rounded-full w-10 h-10'/>
      </Link>
    </div>
  )
}

export default Navbar
