import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from '../../firebase'
import axios from "axios"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
  const [img, setImg] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)
  const [err, setErr] = useState(false)

  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    email: "",
    number: "",
    password: ""
  })

  const navigate = useNavigate()

  const handeImage = (e) => {
    setImg(e.target.files[0])
  }

  const handlechange = (e) => {
    const { name, value } = e.target
    setRegisterDetails((pre) => {
      return {
        ...pre, [name]: value
      }
    })
  }

  const registerUser = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}api/v1/auth/seller/register`, {...registerDetails, ...(imgUrl && {profilepic:imgUrl})})
      response.status === 200 ? navigate('/login') : setErr(true)
    } catch (err) {
      console.log(err)
      setErr(true)
    }
  }

  useEffect(() => {
    if (img && imgUrl) {
      registerUser();
    }
  }, [img, imgUrl]);
  

  const handleRegister = async (e) => {
    e.preventDefault()
    if(img){
      const storage = getStorage();
      const fileName = new Date().getTime() + img.name
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL)
          });
        }
      );
    }else{
      registerUser();
    }
  }

  const singInwithGoogle = async (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider).then((result) => {
      axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}api/v1/auth/google`, {
        username: result.user.displayName,
        email: result.user.email,
        profilepic: result.user.photoURL
      }).then((res) => {
        localStorage.setItem("logKey", res.data.token)
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='flex flex-col px-20 gap-10 bg-[url("https://www.iave.org/iavewp/wp-content/uploads/2020/06/purple-background-registration.png")] bg-no-repeat bg-cover h-screen'>
      <h1 className='text-2xl mt-2 text-[white] font-extrabold'>REGISTER AS SELLER</h1>
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col relative w-32 h-32 border-2 rounded-lg mb-3'>
          <label htmlFor='pp' className='absolute z-50 cursor-pointer text-2xl flex border-4 rounded-full left-1/2 -bottom-5'><AiOutlineCamera /></label>
          <img src={img && URL.createObjectURL(img)} className='w-full h-full rounded-md z-10' />
          <input type='file' id='pp' style={{ display: "none" }} onChange={handeImage} />
        </div>

        <label className='flex gap-5 flex-col text-[white]'>
          Username
          <input type='text' name="username" className='flex outline-none border px-4 py-2 text-[grey] rounded-md' style={{ width: "330px" }} placeholder='enter username' onChange={handlechange} />
        </label>

        <label className='flex gap-5 flex-col text-[white]'>
          Email
          <input type='text' name="email" className='flex outline-none border px-4 py-2 text-[grey] rounded-md' style={{ width: "330px" }} placeholder='enter email' onChange={handlechange} />
        </label>

        <label className='flex gap-5 flex-col text-[white]'>
          Mobile Number
          <input type='text' name="number" className='flex outline-none border px-4 py-2 text-[grey] rounded-md' style={{ width: "330px" }} placeholder='enter Mobile Number' onChange={handlechange} />
        </label>

        <label className='flex gap-5 flex-col text-[white]'>
          password
          <input type='text' name="password" className='flex outline-none border px-4 py-2 rounded-md text-[grey]' style={{ width: "330px" }} placeholder='enter password' onChange={handlechange} />
        </label>

        <div className='flex gap-5 items-center'>

          <button disabled={(registerDetails.username && registerDetails.email && registerDetails.number && registerDetails.password) ? false : true} className='w-fit px-5 py-2 border-2 border-[white] rounded-lg text-white mt-3' onClick={handleRegister}style={!registerDetails.username || !registerDetails.email || !registerDetails.number || !registerDetails.password ? { opacity: "0.5", cursor:"not-allowed"} : {}}>Register</button>

          <button className='w-fit px-5 py-2 border-2 border-[white] rounded-lg text-green-500 mt-3' onClick={singInwithGoogle}>Sign In With GOOGLE</button>
        </div>

      </form>
      {
        err && <b className='text-[tomato]'>something went wrong try again !</b>
      }
      <b className='text-[grey]'>already have an accout ? want to <Link to={'/login'} className='text-[white]'>Sign In .</Link></b>
    </div>
  )
}

export default Register
