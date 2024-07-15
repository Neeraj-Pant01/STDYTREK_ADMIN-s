import React, { useState } from 'react'
import NewRequest from '../../utils/NewRequest'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Blog = () => {
  const [blog, setBlog] = useState("")
  const [title, setTitle] = useState("")

  const navigate = useNavigate()

  const token = localStorage.getItem("logKey")
  const user  = useSelector((state)=>state.userReducer.payload)
  const api = NewRequest(token)

  const handlePost = async (e) =>{
    e.preventDefault();
    try{
      const response = await api.post(`api/v1/blogs/`,{userId:user._id, title:e.target[0].value, desc:e.target[1].value})
      if(response.status===200){
        navigate('/success',{state:{
          genere:"blog"
        }})
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='flex flex-col gap-14 px-20'>
      <h1 className='text-[grey] font-bold py-5 text-2xl'>WRITE A BLOG</h1>
      <div className='flex gap-10'>
      <form className='flex flex-col gap-10 w-96' onSubmit={handlePost}>
        <input className='py-3 px-4 border outline-none rounded-md text-[grey]' type='text' placeholder='enter the title' onChange={(e)=>setTitle(e.target.value)}/>
      <textarea className='px-4 py-3 border outline-none rounded-md resize-none text-[grey]' placeholder='enter the title' rows={10} cols={60} onChange={(e)=>setBlog(e.target.value)}/>
      <button className='border border-[purple] border-1 rounded-md py-2 text-[purple] font-bold'>post</button>
        </form>
        <div className='flex flex-col border px-4 py-3 text-[grey] w-full overflow-hidden'>
          <p className='text-center text-black text-lg'>PREVIEW</p>
          <h2 className='text-[black] font-bold text-xl'>{title}</h2>
          <p className='max-w-full whitespace-normal text-[#696969]'>{blog}</p>
      </div>
      </div>
    </div>
  )
}

export default Blog
