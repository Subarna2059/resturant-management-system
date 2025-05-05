import React, { useEffect, useState } from 'react'
import Banner from '../components/partials/Banner'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../utils/APIcalls'
import { getOrder } from '../actions/order-action'
import Loader from '../components/common/Loader'
import { toast } from 'react-toastify'
import { getLocalStorage } from '../utils/storage'

const Order = () => {
  const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const ordersList = useSelector(state=>state.orderReducer)
    const getOrderList = async() =>{
      try{
        setLoading(true)
        const res = await axiosInstance.get("/order/get",
          {
            headers:{
              Authorization:`Bearer ${getLocalStorage()}`
            }
          }
        )
        if(res.data.data) {
          dispatch(getOrder(res.data.data))
          setLoading(false)
        }
        setLoading(false)
      } catch (e) {
        toast.error("Something went wrong")
      }
    }
    useEffect(()=>{
        getOrderList()
    },[])
  return (
    <>
        <Banner />
        {
          loading ? <div className='xl:w-[99vw] flex items-center justify-center xl:h-[30vh]'><Loader /></div>:
          <div>
            {
              ordersList.length>0 ?
              <div className='w-[100%] flex flex-col items-center my-4 mt-15'>
                <div className='text-bold text-2xl my-3'>All orders</div>
              <table className=''>
                <thead>
                  <tr>
                <th className='border-b-1 border-gray-500 border-r-1 py-4 px-4'>Order</th>
                <th className='border-b-1 border-gray-500 border-r-1 py-4 px-4'>Table</th>
                <th className='border-b-1 border-gray-500 border-r-1 py-4 px-4'>Quantity</th>
                <th className='border-b-1 border-gray-500   py-4 px-4'>Price</th>
                </tr>
                </thead>
             { ordersList.map((items, index)=>{
                    return(
                      <>
                      <tbody key={index}>
                      <tr className=''>
                      <td className='border-b-1 border-gray-500 border-r-1 py-2 px-2 xl:w-48' > {items.orderName} </td>
                      <td className='border-b-1 border-gray-500 border-r-1 py-2 px-2 xl:w-48' > {items.table} </td>
                      <td className='border-b-1 border-gray-500 border-r-1 py-2 px-2 xl:w-48' > {items.quantity} </td>
                      <td className='border-b-1 border-gray-500  px-2 xl:w-48' > {items.price} </td>
                      </tr>
                      </tbody>
                      </>
                    )
                  })}
                </table>
                </div>
              :<div className='w-[100%] mt-4 flex justify-center mt-15'>
              No Record found
              </div>
            }
          </div>
        }
    </>
  )
}

export default Order