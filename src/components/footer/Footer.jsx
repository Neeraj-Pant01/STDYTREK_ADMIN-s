import React from 'react'

const Footer = () => {
  return (
    <div className='flex gap-16 bg-[#e5e0e0] mt-10 text-black px-20 py-10 justify-between'>
      <div>
        <b>Usefull Links</b>
      </div>
      <div className='flex flex-col gap-5 items-center'>
        <b>About</b>
        <img src='/mainlogo.png' className='flex w-20 cursor-pointer'/>
      </div>
      <div>
        <b>social Links</b>
      </div>
    </div>
  )
}

export default Footer
