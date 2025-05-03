import React, { useEffect } from 'react'
import { getLocalStorage } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

const RequireAuth = ({children}) => {
    const navigate = useNavigate()
    const checkAuth = ()=>{
        const token = getLocalStorage()
        if(token == null) {
            navigate("/login")
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