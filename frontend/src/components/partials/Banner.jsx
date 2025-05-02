import React from 'react'
import Navbar from './Navbar'

const Banner = () => {
  return (
    <>
        <div className='w-[99vw] h-[70vh] bg-red-500'>
          <Navbar />
            <img className='w-[100%] h-[100%] object-cover  top-0 left-0' src="https://blog.lisi.menu/wp-content/uploads/2023/08/Food-Poster.jpg" alt="banner image" />
            </div>
    </>
  )
}

export default Banner