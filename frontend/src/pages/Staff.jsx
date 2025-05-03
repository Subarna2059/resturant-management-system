import React, { useEffect, useState } from 'react'
import Banner from '../components/partials/Banner'
import { toast } from 'react-toastify'
import { axiosInstance } from '../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/common/Loader'
import { getUser } from '../actions/user-action'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../utils/storage'

export const Staff = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const users = useSelector(state => state.userReducer)
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/users",{
        headers:{
          Authorization:`Bearer ${getLocalStorage()}`
        }
      })
      setLoading(true)
      dispatch(getUser(res.data.data))
      setLoading(false)
    } catch (e) {
      toast(e.response.data.message)
    }
  }
  const registerStaff = () => {
    navigate("/register")
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
      <Banner />
      {
        loading ? <div className='w-[100%] xl:h-[30vh] flex justify-center items-center'><Loader /></div> :
          <div>
            {
              users.length > 0 ?
                <div className='w-[100%] flex flex-col items-center mt-15 mb-15'>
                  <div className='w-[100%] flex justify-end'>
                    <button onClick={() => registerStaff()} className='px-4 my-2 py-2 bg-blue-600 mr-3 cursor-pointer text-white rounded-md hover:bg-blue-700 transition'>Add staff</button>
                  </div>
                  <div className='font-bold'>
                    Staff
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th className='border-b-1 border-gray-300 border-r-1 py-4 px-4'>User Name</th>
                        <th className='border-b-1 border-gray-300 border-r-1 py-4 px-4'>email</th>
                        <th className='border-b-1 border-gray-300  py-4 px-4'>Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className='border-b-1 border-gray-300 border-r-1 py-2 px-2 xl:w-48'>
                                {
                                  items.userName
                                }
                              </td>
                              <td className='border-b-1 border-gray-300  border-r-1 px-2 xl:w-48'>
                                {
                                  items.email
                                }
                              </td>
                              <td className='border-b-1 border-gray-300  py-2 px-2 xl:w-48'>
                                {
                                  items.number
                                }
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div> :
                <div>
                  No record found
                </div>
            }
          </div>
      }

    </>
  )
}
