import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
    return (
    <div className=' z-10 bg-white w-[99vw] h-[8vh] rounded-sm'>
        <div className='h-[100%] flex justify-around items-center'>
            <div className='text-2xl text-amber-900 text-bold '>
                JAI BASISTA RESORT
            </div>
            <div className='flex  w-[25vw] justify-between text-gray-500'>
                <div onClick={()=>navigate("/")} className='cursor-pointer'>Table</div>
                <div onClick={()=>navigate("/menu")} className='cursor-pointer'>Menu</div>
                <div onClick={()=>navigate("/order")} className='cursor-pointer'>Orders</div>
                <div onClick={()=>navigate("/stock")} className='cursor-pointer'>Stock</div>
                <div onClick={()=>navigate("/staff")} className='cursor-pointer'>Staff</div>
                <div onClick={()=>navigate("/register")} className='cursor-pointer'>Register</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar