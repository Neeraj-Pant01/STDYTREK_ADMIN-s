import axios from 'axios'
import React, { useState } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux"
import { userActions } from '../../redux/actions/actions'


const Login = () => {
  const emailRef = useRef()
  const passRef = useRef()
  const [err, setErr] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state)=>state.userReducer.payload)
  const [loading, setLoading] = useState(false)

  const handelLogin = async () =>{
    setLoading(true)
    try{
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}api/v1/auth/login`,{
        email:emailRef.current.value, password:passRef.current.value
      })
      localStorage.setItem("logKey",response.data.token)
      dispatch(userActions(response.data))
      setLoading(false)
      response.status === 200 && navigate('/')
    }catch(err){
      console.log(err.response.status)
      setLoading(false)
      setErr(err.response.status);
      setTimeout(() => {
        setErr(null)
      }, 5000);
    }
  }
  return (
    <div className='h-screen bg-[purple] md:px-20 flex flex-col items-center md:items-start md:justify-normal py-28'>
      <h1 className='text-[white] text-2xl font-extrabold py-7'>SIGN IN TO YOUR ACCOUNT </h1>

      <b className='flex my-5 text-[lightgrey]'>don't have an account ? <span><Link to={`/register`} className='text-[white]'>&nbsp; Register here !</Link></span></b>

      <input type='text' ref={emailRef} placeholder='enter your email' className='outline-none border-2 border-[white] py-2 px-4 rounded-md' style={{width:"330px"}}/>

      <input type='password' ref={passRef} placeholder='enter your password' className='outline-none border-2 border-[white] py-2 px-4 rounded-md mt-5' style={{width:"330px"}}/>

      {
        loading ?
        <div className='w-fit mt-8 border-2 px-6 py-2 text-white font-bold rounded-md'>Loading..</div>
        :
      <button className='w-fit mt-8 border-2 px-6 py-2 text-white font-bold rounded-md' onClick={handelLogin}>Login</button>
}

      {
        err && <b className='text-[tomato] mt-4 text-lg'>{
          err===401 ? "invalid credentials !" : err===404 ? "user with this email not found !" : "internal server error try after some time !"
        }</b>
      }
    </div>
  )
}

export default Login
