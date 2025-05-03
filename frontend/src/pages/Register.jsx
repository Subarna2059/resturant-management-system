import React, { useState } from 'react'
import { axiosInstance } from '../utils/APIcalls'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../utils/storage'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const[inputData, setInputData] = useState({
        userName:"",
        password:"",
        email:"",
        number:"",
    })
    const handleOnChange = (e)=>{
        setInputData({
            ...inputData,
            [e.name]:e.value
        })
    }
    const handleOnSubmit = async() => {
        try{
            if(inputData.userName =="" || inputData.password=="" || inputData.email=="" ){
                toast("Invalid input")
            } else {
                const res = await axiosInstance.post("/auth/register",{
                    userName:inputData.userName,
                    password:inputData.password,
                    email:inputData.email,
                    number:inputData.number,
                    role:"staff"
                },{
                    headers:{
                        Authorization:`Bearer ${getLocalStorage()}`
                    }
                })
                if(res) {
                    navigate("/staff")
                  toast("Staff register successful")
                } else {
                    toast(res.response.data.message)
                }
            }
        } catch(e) {
            toast(e.response.data.message)
        }
    }
    const handleOnCancleRegister = () =>{
        navigate("/staff")
    }
    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className='w-[30vw] p-6 flex flex-col items-center rounded-lg shadow-md'>
                    <div className=' text-2xl mb-4 text-center font-semibold'>
                        Register
                    </div>
                    <div className='mb-4'>
                        <label className='block  mb-1'>User Name</label>
                        <input onChange={(e) => handleOnChange(e.target)} type="text" name='userName' className='xl:w-[20vw] p-2 rounded border' />
                    </div>
                    <div className='mb-4'>
                        <label className='block  mb-1'>Email</label>
                        <input onChange={(e) => handleOnChange(e.target)} type="text" name='email' className='xl:w-[20vw] p-2 rounded border' />
                    </div>
                    <div className='mb-4 ml-6'>
                        <label className='block  mb-1'>Password</label>
                        <div className='flex items-center'>
                            <input onChange={(e) => handleOnChange(e.target)} type={`${showPassword ? 'text' : 'password'}`} name='password' className='xl:w-[20vw] p-2 rounded border inline' />
                            <i className={`ml-2 ${showPassword ? 'bi bi-eye' : 'bi-eye-slash'}  inline`} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>
                    </div>
                    <div className='mb-4'>
                    <label className='block  mb-1'>Phone Number</label>
                        <input onChange={(e)=>handleOnChange(e.target)} type="text"name='number' className='xl:w-[20vw] p-2 rounded border' />
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={() => handleOnSubmit()} className='bg-blue-500 mr-4 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'>
                            Submit
                        </button>
                        <button onClick={() => handleOnCancleRegister()} className='bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register