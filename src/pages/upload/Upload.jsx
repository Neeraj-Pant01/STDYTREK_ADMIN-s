import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import NewRequest from '../../utils/NewRequest';
import { AiFillCiCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [error, setError] = useState(null)
  const [picture, setPicture] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pictureUrl, setPictureUrl] = useState()
  const [courseDetails, setCourseDetails] = useState({
    name: "",
    desc: "",
    price: "",
    notes: "",
    lectures: "",
    testSeries: "",
    interviewQuestions:"",
    features:""
  })
  const [uploadPerc, setUploadPerc] = useState(0);
  const navigate = useNavigate()

  const token = localStorage.getItem("logKey")
  const user = useSelector((state) => state.userReducer.payload)
  const api = NewRequest(token)

  const handleupload = (e) => {
    e.preventDefault()

    if (picture) {
      const storage = getStorage();
      const fileName = new Date().getTime() + picture.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, picture);


      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadPerc(progress)
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPictureUrl(downloadURL)
            setUploaded(true)
          });
        }
      );
    } else {
      setError(204);
      setTimeout(() => {
        setError(null)
      }, 10000);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((pre) => {
      return {
        ...pre, [name]: value
      }
    })
  }

  const uploadCourse = async () => {
    setLoading(true)
    try {
      const res = await api.post(`api/v1/courses/upload`, {
        userId: user._id, picture: pictureUrl, ...courseDetails
      })
      if(res.status===200){
        setTimeout(() => {
          navigate('/success',{
            state:{
              genere: "course"
            }
          })
        }, 500);
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      setError(206)
      setTimeout(() => {
        setError(null)
      }, 5000);
    }
  }

  useEffect(() => {
    if (uploaded && pictureUrl) {
      uploadCourse()
    }
  }, [uploaded && pictureUrl])

  return (
    <div className='flex flex-col gap-5 px-2 mb-3 md:px-20'>
      <h1 className='text-2xl text-[#827d7d] my-6'>upload a new course</h1>

      <div className='flex items-center px-8 md:px-0 justify-center border-2 md:w-52 md:h-52 rounded-lg relative'>
        <label htmlFor='id' className='cursor-pointer w-full h-full'>
          <img src={picture ? URL.createObjectURL(picture) : "/preview.png"} alt="" className='flex w-full h-full rounded-md' />
        </label>
        {/* <label htmlFor='id' className='cursor-pointer text-4xl absolute bottom-[0] rounded-full border-4 border-[#827d7d] text-[#827d7d]'>
            <AiOutlineCamera />
        </label> */}
        <input id='id' type='file' onChange={(e) => setPicture(e.target.files[0])} style={{ display: "none" }} />
      </div>

      {uploadPerc > 0 ? <span className='text-[#827d7d]'>{"uploading " + Math.floor(uploadPerc)}</span> : <span className='text-[#827d7d]'>upload course picture</span>}

      <b className='text-sm text-[black] my-6'>here we have taken google drive as example but you can use your any cloud storage which is easy accessable to users</b>

      <form className='flex flex-col gap-5' onSubmit={handleupload}>
        <input type='text' name='name' placeholder='enter course name' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md md:w-96' onChange={handleChange} />

        <input type='text' name="desc" placeholder='enter course desc..' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md md:w-96' onChange={handleChange} />

        <input type='number' name='price' placeholder='enter course price' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md md:w-96' onChange={handleChange} />

        <input type='text' name='notes' placeholder='enter notes pdf link of google drive' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md md:w-96' onChange={handleChange} />

        <input type='text' name='lectures' placeholder='enter video lectures link of google drive folder' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md md:w-96' onChange={handleChange} />

        <input type='text' name='testSeries' placeholder='enter test series question papers drive link' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md md:w-96' onChange={handleChange} />

        <input type='text' name='interviewQuestions' placeholder='enter interviewquestions pdf link of google drive' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md md:w-96' onChange={handleChange}/>

        <textarea type='text' name='features' placeholder='enter course features use comma(,) to seperate features' className='px-5 py-2 border border-[#827d7d] outline-none rounded-md md:w-96 h-[200px]' onChange={handleChange}/>
        {
          loading ?
          <div className='text-[teal]'>upLoading please wait ...</div>
          :  
        <button className=' bg-purple-700 w-fit px-16 py-3 rounded-md text-white cursor-pointer'>{error ? <AiFillCiCircle color='red' fontSize="24px" /> : "upload"}</button>
        }
        {
          error && <p style={{ color: 'red' }}>{error === 204 ? "image not uploaded try again" : "something went wrong try again"}</p>
        }
        {
           
        }
      </form>
    </div>
  )
}

export default Upload
