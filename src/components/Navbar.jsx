import React, { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector((state)=>state.userReducer.payload)

  const handleLogOut = () =>{
    localStorage.removeItem("persist:study_trek");
    window.location.reload()
  }
  return (
    <div className='flex bg-purple-500 m-0 p-0 py-5 px-10 sticky top-0 z-30 text-white justify-between items-center'>
      <Link to={'/'} className='flex items-center font-bold'><img src={"/mainlogo.png"} alt="" className='flex w-20 cursor-pointer' />STUDYTREK</Link>
      <div className="border flex items-center bg-[white] px-3 rounded-md" style={{width:"330px"}}>
        <AiOutlineSearch className='text-[black]'/>
        <input placeholder='search here !' className='text-[black] outline-none font-thin px-4 py-1 text-sm'/>
      </div>
      <div className='flex gap-10 items-center'>
        <Link to={'/blog'} className='font-bold'>WRITE BLOG</Link>
        <Link to={`/upload`} className='font-bold'>UPLOAD NEW COURSE</Link>
      </div>
      <div className='flex items-center gap-3'>
      <Link to={`/profile/${user?._id}`}>
      <img src={user?.profilepic ? user?.profilepic : 'no.png'} className='rounded-full w-10 h-10'/>
      </Link>
      <b className='cursor-pointer text-[#FFB6C1]' onClick={handleLogOut}>LogOut</b>
      </div>
    </div>
  )
}

export default Navbar
