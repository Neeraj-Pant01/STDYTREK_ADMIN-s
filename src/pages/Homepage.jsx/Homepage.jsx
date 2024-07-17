import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const customData = [
  {
      title: "launch your course",
      img:"https://static.vecteezy.com/system/resources/previews/022/593/842/original/business-training-course-free-png.png",
      desc:"Welcome to Launch Your Course, the ultimate destination for educators and learners to connect, create, and grow. Whether you're an expert looking to share your knowledge or a student eager to expand your skills, our platform provides the tools and support you need to succeed.",
      why:"Why Choose Launch Your Course?",
      features:[
        {
          heading:"User-Friendly Interface",
          feature:"Our platform is designed with simplicity and efficiency in mind. Both instructors and learners will find it easy to navigate and use."
        },
        {
          heading:"Community Support",
          feature:"Join a vibrant community of educators and learners. Share experiences, ask questions, and grow together."
        },
        {
          heading:"Secure and Reliable",
          feature:"Trust that your data and content are safe with our state-of-the-art security measures and reliable hosting services."
        }
      ]
  },
  {
    title: "Be an online Teacher",
    img:"https://cdn.pixabay.com/photo/2020/10/28/19/26/teacher-5694365_1280.png",
    desc:"Welcome to Be an Online Teacher, the platform that empowers educators to reach students across the globe. If you have a passion for teaching and expertise to share, our platform provides everything you need to create, manage, and market your online courses.",
    why:"Why Become an Online Teacher?",
    features:[
      {
        heading:"Global Reach",
        feature:"Expand your audience beyond geographical boundaries. Teach students from different cultures and backgrounds, and make a global impact."
      },
      {
        heading:"Flexible Teaching",
        feature:"Enjoy the freedom to teach on your terms. Create your own schedule, design your courses, and manage your time effectively."
      },
      {
        heading:"Additional Income",
        feature:"Monetize your expertise by creating paid courses. Turn your knowledge into a steady source of income while doing what you love."
      }
    ]
},
]

const Homepage = () => {
  const user = useSelector((state)=>state.userReducer.payload)

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex flex-col items-center justify-center transition-all'>
        <div className='flex flex-col md:mt-10 mt-4 items-center justify-center'>
          <b className='text-xl md:text-3xl text-[grey]'>WELCOME BACK !</b>
          <span className='text-lg md:text-xl'>{user?.username}</span>
          <p className='mt-3 text-center text-[grey]'>Let's Resume Your Journey , Track Your Courses write a Bolg , update any of your courses or try adding some new courses</p>
        </div>

        <div className='flex w-[100%] items-center mt-8 justify-center flex-col'>
          <h1 className='md:text-3xl text-xl uppercase mb-2'>{customData[0].title}</h1>
          <div className="flex relative w-[90%] h-[500px]">
          <img className='mt-2 w-[90%] rounded-lg' src={customData[0].img} />
          <div className="absolute top-0 w-[100%] gap-3 h-[100%] flex flex-col items-center justify-center bg-gradient-to-b bg-[rgba(0,0,0,0.6)] rounded-lg">
          <b className='text-[white] text-xl md:text-2xl'>{customData[0].why}</b>
          {
            customData[0].features.map((f,i)=>{
              return (
                <div className='flex flex-col text-[white] w-[90%] gap-1'>
                  <b className='text-md:xl'>{f.heading}</b>
                  <p className='text-sm md:text-lg'>{f.feature}</p>
                  </div>
              )
            })
          }
          </div>
          </div>
        </div>

        <div className='flex w-[100%] items-center mt-8 justify-center flex-col'>
          <h1 className='md:text-3xl text-xl uppercase mb-2'>{customData[1].title}</h1>
          <div className="flex relative w-[90%] h-[500px]">
          {/* <img className='mt-2 w-[90%] ml-auto mr-auto rounded-lg' src={customData[1].img} /> */}
          <div className="absolute top-0 w-[100%] gap-3 h-[100%] flex flex-col items-center justify-center bg-gradient-to-b] rounded-lg">
          <b className='text-[black] text-xl md:text-2xl'>{customData[1].why}</b>
          {
            customData[1].features.map((f,i)=>{
              return (
                <div className='flex flex-col text-[grey] w-[90%] gap-1'>
                  <b className='md:text-xl'>{f.heading}</b>
                  <p className='text-sm md:text-lg'>{f.feature}</p>
                  </div>
              )
            })
          }
          </div>
          </div>
        </div>
        <Link to={'/upload'} className='px-4 py-2 mb-5 text-[white] bg-[violet] rounded-md cursor-pointer'>Upload New Course</Link>
      </div>
    </div>
  )
}

export default Homepage
