import React, { useEffect } from 'react'
import Loader from '../components/common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../utils/APIcalls'
import Banner from '../components/partials/Banner'
import { getTable } from '../actions/table-action'
import TableStorage from '../components/common/TableStorage'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../utils/storage'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const table = useSelector(state=>state.getTableReducer)
  const accessTable = async() =>{
    try{
      const res = await axiosInstance.get("/table",{
        headers:{
          Authorization:`Bearer ${getLocalStorage()}`
        }
      })
      if(res) {
        dispatch(getTable(res.data.data))
      } else {
        toast.error("Something went wrong")
      }
    } catch (e) {
      navigate("/menu")
      toast.error(e.response?.data.message)
    }
    
  }
  const onTableClick = (id) => {
    navigate(`/table/${id}`)
  }
  useEffect(()=>{
    accessTable()
  },[])
  return (
    <>
      <Banner />
      {
          table ? <> 
          {
            <div className='mt-15'>
           { table.map((items,index)=>{
              return(
                <div key={index}>
                  <TableStorage onClick={()=>onTableClick(items._id)} tableName={items.title} color={items.tableOccupied ? "bg-red-300": "bg-green-300"} borderColor={items.tableOccupied ? "border-red-500": "border-green-500"}/>
                </div>
              )
            })}
            </div>
          }
          </> : <div className='w-[100%] mt-4 flex justify-center'>
                    No Record found
                    </div>
      }
    </>
  )
}

export default Dashboard