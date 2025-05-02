import React, { useEffect, useState } from 'react'
import Banner from '../components/partials/Banner'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/common/Loader'
import { toast } from 'react-toastify'
import { axiosInstance } from '../utils/APIcalls'
import { getStock } from '../actions/stock-action'
import { AddStockModal } from '../components/common/AddStockModal'

const Stock = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const stock = useSelector(state=>state.stockReducer)
  const getStockData = async() =>{
    try{
      const res = await axiosInstance.get("/stock")
      setLoading(true)
      dispatch(getStock(res.data.data))
      setLoading(false)
    } catch (e) {
      toast("Something went wrong")
    }
  }
  useEffect(()=>{
    getStockData()
  },[])
  return (
    <>
    <AddStockModal/>
        <Banner />
    {
      loading ? <div className='w-[100%] xl:h-[30vh] flex justify-center items-center'><Loader /></div>:
      <>
        {
          stock.length > 0?
          <div className='w-[100%] flex flex-col items-center mt-15 mb-15'>
            <div className='font-bold'>
            Stock
            </div>
          <table>
            <thead>
              <tr>
              <th className='border-b-1 border-gray-300 border-r-1 py-4 px-4'>Title</th>
              <th className='border-b-1 border-gray-300 border-r-1 py-4 px-4'>Category</th>
              <th className='border-b-1 border-gray-300  py-4 px-4'>Quantity</th>
              </tr>
            </thead>
          <tbody>
            {
              stock.map((items, index)=>{
                return(
                  <tr key={index}>
                    <td className='border-b-1 border-gray-300 border-r-1 py-2 px-2 xl:w-48'>
                      {
                        items.title
                      }
                    </td>
                    <td className='border-b-1 border-gray-300  border-r-1 px-2 xl:w-48'>
                      {
                        items.category
                      }
                    </td>
                    <td className='border-b-1 border-gray-300  py-2 px-2 xl:w-48'>
                      {
                        items.quantity
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          </table>
          </div>
          :<div>
            No record found
          </div> 
        }
      </>
    }
    </>
  )
}

export default Stock