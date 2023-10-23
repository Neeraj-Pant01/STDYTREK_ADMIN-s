import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1>SIGN IN TO YOUR ACCOUNT </h1>
      <b>don't have an account ? <span><Link to={`/register`}>Register</Link></span> here !</b>
      <input type='text' placeholder='enter your username' />
      <input type='text' placeholder='enter your email' />
      <button>Login</button>
    </div>
  )
}

export default Login
