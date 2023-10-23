import React, { useState } from 'react'
import { AiOutlineCamera } from "react-icons/ai"
import { Link } from 'react-router-dom'

const Register = () => {
    const [img, setImg] = useState(null)
  return (
    <div>
      <h1>REGISTER AS TEACHER</h1>
      <form action="">
        <div>
            <label htmlFor='pp' ><AiOutlineCamera /></label>
            <img src={img && URL.createObjectURL(img)} alt="profileImg" />
            <input type='file' id='pp' style={{display:"none"}} onChange={(e)=>setImg(e.target.files[0])}/>
        </div>
        <label>
            username
            <input type='text' />
        </label>
        <label>
            email
            <input type='text' />
        </label>        <label>
            mobile Number
            <input type='text' />
        </label>        <label>
            password
            <input type='text' />
        </label>
        <button>Register</button>
      </form>
      <b>already have an accout ? want to <Link to={'/login'}>Sign In</Link></b>
    </div>
  )
}

export default Register
