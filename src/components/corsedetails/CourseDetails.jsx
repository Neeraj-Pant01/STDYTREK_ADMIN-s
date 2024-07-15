import React from 'react'
import "../../pages/Homepage.jsx/home.css"

const courses = ["java", "python", "html", "css", "react.js"]

const CourseDetails = () => {
  return (
    <div className='flex flex-col w-full overflow-y-scroll sh' style={{height:"520px"}}>
      <h1 className='text-[white] text-xl font-extrabold'>YOUR COURSES</h1>
      <ul className='flex flex-col mt-5 gap-3'>
        {
            courses.map((c,i)=>{
                return (
                    <li key={i} className='flex list-none items-center text-[white] justify-between'>
                        <div className='flex items-center gap-5 flex-1'>
                        <img src='https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg' alt='' className='rounded-full w-9 h-9 border-2'/>
                        <div className='flex flex-col w-32'>
                            <span className='text-[white]'>{c}</span>
                            <span className='text-xs text-[grey]'>empty</span>
                        </div>
                        </div>
                        <span className='flex-1 flex items-end justify-center'>999</span>
                    </li>
                )
            })
        }
      </ul>
    </div>
  )
}

export default CourseDetails
