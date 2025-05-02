import React from 'react'

const Card = ({src, content}) => {
  return (
    <>
        <div className='xl:w-[28vw] xl:h-[20vh] '>
            <div className='flex'>
            <div>
                <img className='xl:h-[20vh] xl:w-[10vw] object-cover ' src={src} alt="Food image" />
            </div>
            <div className='ml-2 flex flex-col justify-between'>
                <div>
                <div className='text-lg font-semibold'>
                    {content.title}
                </div>
                <div className='text-sm text-gray-500 font-light'>
                    {content.description}
                </div>
                <div className='text-sm text-gray-500 font-light'>
                    {content.category}
                </div>
                </div>
                <div className='text-sm  font-light mb-4'>
                    Rs.{content.price}
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Card