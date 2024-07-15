import React, { useEffect } from 'react'
import {useLocation, useNavigate } from 'react-router-dom'

const Sucess = (state) => {
    const navigate = useNavigate()
    useEffect(()=>{
        setTimeout(() => {
            navigate('/')
        }, 3000);
    },[])

    const location = useLocation()
    console.log(location)
  return (
    <div>
      {location.state.genere} uploaded successfull redirecting to statistics please wait
    </div>
  )
}

export default Sucess
