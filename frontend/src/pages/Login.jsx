import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosInstance } from '../utils/APIcalls'
import { getLocalStorage, setLocalStorage } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loginDetail, setLoginDetail] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleOnChange = (e) => {
        try{
            setLoginDetail({
                ...loginDetail,
                [e.name]:e.value
            })
        } catch {
            toast.error("Something went wrong ")
        }
    }
    useEffect(()=>{
        if(getLocalStorage('token') != null) {
            navigate("/")
        }

    })
    const handleOnSubmit = async() =>{
        try {
            if(loginDetail.email == "" || loginDetail.password == "") {
                toast("Invalid input")
            } else {
                const res = await axiosInstance.post("/auth/login",{
                    email:loginDetail.email,
                    password:loginDetail.password
                })

                if(res) {
                    setLocalStorage(res.data.token)
                    navigate("/")
                } else {
                    toast("Invalid email or password")
                }
            }
        } catch(e) {
            toast.error(e.response?.data.message||"Something went wrong")
        }
    }
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-[30vw] p-6 flex flex-col items-center rounded-lg shadow-md'>
          <div className=' text-2xl mb-4 text-center font-semibold'>
            Login
          </div>
          <div className='mb-4'>
            <label className='block  mb-1'>Email</label>
            <input onChange={(e)=>handleOnChange(e.target)} type="text"name='email' className='xl:w-[20vw] p-2 rounded border' />
          </div>
          <div className='mb-4 ml-6'>
            <label className='block  mb-1'>Password</label>
            <div className='flex items-center'>
            <input onChange={(e)=>handleOnChange(e.target)} type={`${showPassword ? 'text':'password'}`} name='password' className='xl:w-[20vw] p-2 rounded border inline' />
            <i className={`ml-2 ${showPassword ? 'bi bi-eye': 'bi-eye-slash' }  inline`} onClick={()=>setShowPassword(!showPassword)}></i>
            </div>
          </div>
          <div className='flex justify-center'>
            <button onClick={()=>handleOnSubmit()} className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
