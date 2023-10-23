import React, { useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'

const Upload = () => {
    const [picture, setPicture] = useState(null)

    const handleupload = (e) =>{
        e.preventDefault()
        console.log(e.target[0].value)
    }
  return (
    <div className='flex flex-col gap-5 px-20'>
      <h1 className='text-2xl text-[#827d7d] my-6'>upload a new course</h1>
      <div className='flex items-center justify-center border-2 w-52 h-52 rounded-lg relative'>
        <label htmlFor='id' className='cursor-pointer w-full h-full'>
        <img src={picture ? URL.createObjectURL(picture) : "/preview.png"} alt="" className='flex w-full h-full rounded-md'/>
        </label>
        {/* <label htmlFor='id' className='cursor-pointer text-4xl absolute bottom-[0] rounded-full border-4 border-[#827d7d] text-[#827d7d]'>
            <AiOutlineCamera />
        </label> */}
        <input id='id' type='file' onChange={(e)=>setPicture(e.target.files[0])} style={{display:"none"}} />
      </div>
      <span className='text-[#827d7d]'>upload course picture</span>
      <form className='flex flex-col gap-5' onSubmit={handleupload}>
        <input type='text' placeholder='enter course name' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md w-96'/>

        <input type='text' placeholder='enter course desc..' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md w-96' />

        <input type='number' placeholder='enter course price' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md w-96' />

        <input type='text' placeholder='enter notes pdf link of google drive' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md w-96' />

        <input type='text' placeholder='enter video lectures link of google drive' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md w-96' />

        <input type='text' placeholder='enter test series question papers drive link' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md w-96' />

        <button className=' bg-purple-700 w-fit px-16 py-3 rounded-md text-white cursor-pointer'>upload</button>
      </form>
    </div>
  )
}

export default Upload
