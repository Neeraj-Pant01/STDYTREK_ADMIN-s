import React, { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [file, setFile] = useState(null)
  return (
    <div className='flex px-20 gap-20 bg-grey m-0 py-10 bg-50% bg-center bg-no-repeat'>

        {/* prile-details */}
        <div className='flex flex-col gap-10'>
        <div className='flex flex-col w-fit px-11'>
            <div className='flex w-40 h-40 rounded-lg border-4 border-purple-500 justify-center items-center relative'>
                <img src={file && URL.createObjectURL(file)} alt="" className='w-full h-full rounded-lg'/>
                <label htmlFor='file' className='self-center absolute bottom-0'><AiFillCamera className='self-center text-4xl text-black cursor-pointer'/></label>
            </div>
                <input type='file' id='file' onChange={(e)=>setFile(e.target.files[0])} style={{display:"none"}}/>
            <span className='self-center text-[black] text-lg'>username</span>
        </div>

        {/* update user's info */}
        <div className='bg-inherit'>
            <form className='flex flex-col w-96 gap-5 outline-none'>
                <input className='text-[#827d7d] border rounded-md border-[#aca5a5] outline-none px-5 py-2' type='text' value={'username'}/>

                <input className='text-[#827d7d] border rounded-md border-[#aca5a5] outline-none px-5 py-2' type='email' value={'email'} />

                <input className='text-[#827d7d] border rounded-md border-[#aca5a5] outline-none px-5 py-2' type='password' value={'password'} />

                <input className='text-[#827d7d] border rounded-md border-[#aca5a5] outline-none px-5 py-2' type='text' value={'number'} />
            <button className='py-2 text-white bg-purple-700 text-lg border-2 border-[#aca5a5] rounded-md'>update</button>
            </form>
        </div>
        </div>

        <div className='flex border w-full h-full text-[#827d7d]'>
        <div className='flex flex-col gap-5 text-[#aca5a5]'>
            <h1 className='text-[#827d7d] text-xl'>total courses (2)</h1>
            <div className='flex flex-col gap-5'>
                <Link to={`/course/:id`} >course1 </Link>
            </div>
            <h1 className='text-[#827d7d] text-xl'>Blogs Written (10)</h1>
        </div>
        </div>
    </div>
  )
}

export default Profile
