import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCamera, AiFillDelete, AiFillEye, AiOutlineCheckCircle, AiOutlineLoading } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import NewRequest from '../../utils/NewRequest';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/actions/actions';


const Profile = () => {
    const [file, setFile] = useState(null)
    const [imgUploaded, setImgUploaded] = useState(false)
    const [imgUrl, setImgUrl] = useState()
    const formRef = useRef()
    const [currentUser, setCurrenTuser] = useState()
    const [updated, setUpdated] = useState(false)
    const [locading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [blogs, setBlogs] = useState([])

    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        number: ''
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser) {
            setUserDetails({
                username: currentUser.username,
                email: currentUser.email,
                number: currentUser.number
            })
        }
    }, [currentUser])

    const token = localStorage.getItem("logKey");
    const api = NewRequest(token)

    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((pre) => {
            return {
                ...pre, [name]: value
            }
        })
    }

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await api.get(`api/v1/users/get/${id}`)
                console.log(res.data)
                setCurrenTuser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProfile()
    }, [id])


    const apicall = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}api/v1/users/${id}`, {
                ...userDetails,
                ...(imgUploaded && { profilepic: imgUrl })
            }, {
                headers: {
                    "Authorization": `bearer ${token}`
                }
            })
            console.log(response)
            response.status === 200 && setUpdated(true)
            dispatch(userActions(response.data))
            setLoading(false)
            setTimeout(() => {
                setUpdated(false)
            }, 5000);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (file && imgUploaded) {
            apicall()
        }
    }, [file, imgUploaded])

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (file) {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setImgUrl(downloadURL)
                        setImgUploaded(true);
                    });
                }
            );
        } else {
            await apicall()
        }
    }

    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await api.get(`${import.meta.env.VITE_REACT_APP_API_URL}api/v1/courses?userId=${id}`)
                setCourses(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getCourses()
    }, [])

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await api.get(`${import.meta.env.VITE_REACT_APP_API_URL}api/v1/blogs/all`)
                setBlogs(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getBlogs()
    }, [])
    return (
        <div className='flex px-20 gap-20 bg-grey m-0 py-10 bg-50% bg-center bg-no-repeat' style={{ minHeight: "80vh" }}>

            {/* prile-details */}
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col w-fit px-11'>
                    <div className='flex w-40 h-40 rounded-lg border-4 border-purple-500 justify-center items-center relative'>
                        <img src={file ? URL.createObjectURL(file) : currentUser?.profilepic} alt="" className='w-full h-full rounded-lg' />
                        <label htmlFor='file' className='self-center absolute bottom-0'><AiFillCamera className='self-center text-4xl text-black cursor-pointer' /></label>
                    </div>
                    <input type='file' id='file' onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                    <span className='self-center text-purple-500 text-lg '>{userDetails.username}</span>
                </div>

                {/* update user's info */}
                <div className='bg-inherit'>
                    <form onSubmit={handleUpdate} ref={formRef} className='flex flex-col w-96 gap-5 outline-none'>

                        <input className='text-[#827d7d] border rounded-md border-[#aca5a5] outline-none px-5 py-2' type='text' name='username' value={userDetails.username} onChange={handleChange} />

                        <input className='text-[#827d7d] border rounded-md border-[#aca5a5] outline-none px-5 py-2' type='email' name='email' value={userDetails.email} onChange={handleChange} />

                        <input className='text-[#827d7d] border rounded-md border-[#aca5a5] outline-none px-5 py-2' type='text' name='number' value={userDetails.number} onChange={handleChange} />

                        <button className='py-2 text-white bg-purple-700 text-lg border-2 border-[#aca5a5] rounded-md' >update</button>
                    </form>
                    {
                        locading &&
                        <b className='text-[blue] text-xl mt-8 flex gap-2 items-center'>Loading...<AiOutlineLoading className='text-2xl font-extrabold' /></b>
                    }
                    {
                        updated &&
                        <b className='text-[green] text-xl mt-8 flex gap-2 items-center'> profile updated successfully <AiOutlineCheckCircle className='text-2xl font-extrabold' /></b>
                    }
                </div>
            </div>

            <div className='flex w-full h-full text-[#827d7d] px-16'>
                <div className='flex flex-col gap-5 text-[#aca5a5]'>
                    <h1 className='text-[#313131] text-xl'>total courses uploaded ({courses.length})</h1>
                    <div className='flex flex-col gap-5'>
                        {
                            courses.length > 0 && courses.map((c) => {
                                return (
                                    <div key={c.price} className='flex items-center justify-between' style={{width:"400px"}}>
                                        <span className='text-[blue]' to={`${c._id}`}>{c.name}</span>
                                        <Link>
                                        <AiFillEye className='text-[green] text-2xl cursor-pointer'/>
                                        </Link>
                                        <AiFillDelete className='text-[tomato] text-2xl cursor-pointer'/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <h1 className='text-[#313131] text-xl'>Blogs Written ({blogs.length})</h1>
                    {
                            blogs.length > 0 && blogs.map((b) => {
                                return (
                                    <div key={b._id} className='flex items-center justify-between'>
                                        <span className='text-[blue]' to={`${b._id}`}>{b.title}</span>
                                        <Link>
                                        <AiFillEye className='text-[green] text-2xl cursor-pointer'/>
                                        </Link>
                                        <AiFillDelete className='text-[tomato] text-2xl cursor-pointer'/>
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
        </div>
    )
}

export default Profile
