import React, { useEffect } from 'react'
import { getLocalStorage } from '../utils/storage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RequireAuth = ({children}) => {
    const navigate = useNavigate()
    const checkAuth = ()=>{
        const token = getLocalStorage()
        if(token == null) {
            navigate("/login")
            toast.error("Please login first")
        }
    }
    useEffect(()=>{
        checkAuth()
    })
  return (
    <>
    {children}
    </>
  )
}

export default RequireAuth