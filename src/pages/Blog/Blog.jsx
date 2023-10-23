import React, { useState } from 'react'

const Blog = () => {
  const [blog, setBlog] = useState("")
  const [title, setTitle] = useState("")

  const handlePost = (e) =>{
    e.preventDefault();
    console.log(e.target[0].value)
    console.log(e.target[1].value)
  }
  return (
    <div className='flex flex-col gap-14 px-20'>
      <h1 className='text-[grey] font-bold py-5 text-2xl'>WRITE A BLOG</h1>
      <div className='flex gap-10'>
      <form className='flex flex-col gap-10 w-96' onSubmit={handlePost}>
        <input className='py-3 px-4 border outline-none rounded-md text-[grey]' type='text' placeholder='enter the title' onChange={(e)=>setTitle(e.target.value)}/>
      <textarea className='px-4 py-3 border outline-none rounded-md resize-none text-[grey]' placeholder='enter the title' rows={10} cols={60} onChange={(e)=>setBlog(e.target.value)}/>
      <button className='border border-[purple] border-1 rounded-md py-2 text-[purple]'>post</button>
        </form>
        <div className='flex flex-col border px-4 py-3 text-[grey] w-full overflow-hidden'>
          <h2 className='text-[black] font-bold text-xl'>{title}</h2>
          <p className='max-w-full whitespace-normal'>{blog}</p>
      </div>
      </div>
    </div>
  )
}

export default Blog
