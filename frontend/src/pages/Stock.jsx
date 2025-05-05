import React, { useEffect, useState } from 'react'
import Banner from '../components/partials/Banner'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/common/Loader'
import { toast } from 'react-toastify'
import { axiosInstance } from '../utils/APIcalls'
import { getStock } from '../actions/stock-action'
import { AddStockModal } from '../components/common/AddStockModal'
import { setModalTrue } from '../actions/modal-action'
import { getLocalStorage } from '../utils/storage'

const Stock = () => {
  const [loading, setLoading] = useState(false)
  const [modalName, setModalName] = useState("")
   const [dataToEdit, setDataToEdit] = useState({
          id:"",
          title:"",
          quantity:"",
          category:"",
      })
  const dispatch = useDispatch()
  const stock = useSelector(state=>state.stockReducer)
  const modal = useSelector(state=>state.modalReducer)
  const getStockData = async() =>{
    try{
      const res = await axiosInstance.get("/stock",{
        headers:{
          Authorization:`Bearer ${getLocalStorage()}`
        }
      })
      setLoading(true)
      dispatch(getStock(res.data.data))
      setLoading(false)
    } catch (e) {
      toast.error("Something went wrong")
    }
  }
  const showModal = () => {
    setDataToEdit({
      ...dataToEdit,
      id:"",
      title:"",
      quantity:"",
      category:"",
    })
    setModalName("Add Stock")
    dispatch(setModalTrue())
  }
  const handleOnDeleteClick = async(id) => {
    try{
      const confirm = window.confirm("Do you really want to delete the stock?")
      if(confirm) {
        const res = await axiosInstance.delete(`/stock/${id}`,{
          headers:{
            Authorization:`Bearer ${getLocalStorage()}`
          }
        })
        if(res) {
          getStockData(),
          toast("Data deleted successfully")
        } else {
          toast.error("Something went wrong")
        }
      }
    } catch(e) {
      toast.error(e.response?.data.message ||"Something went wrong")
    }
  }
  const handleOnEditClick = async(id) => {
    try {
      const res = await axiosInstance.get(`/stock/${id}`,{
        headers:{
          Authorization:`Bearer `
        }
      })
      if(res) {
        setDataToEdit({
          ...dataToEdit,
          id:res.data.data._id,
          title:res.data.data.title,
          quantity:res.data.data.quantity,
          category:res.data.data.category,
        })
    setModalName("Edit Stock")
        dispatch(setModalTrue())
      } else {
        toast("Something went wrong")
      }
    } catch(e) {
      toast(e.message)
    }
  }
  useEffect(()=>{
    getStockData()
  },[])
  return (
    <>
    {
      modal ?
      <AddStockModal getStockData={()=>getStockData()} dataToEdit={dataToEdit} modalName={modalName}/>:
      <></>
    }
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
            <div className='xl:w-[85vw] flex justify-end'>
                    <button onClick={()=>showModal()} className=' mr-2 cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>Add stockr</button>
                  </div>
          <table>
            <thead>
              <tr>
              <th className='border-b-1 border-gray-300 border-r-1 py-4 px-4'>Title</th>
              <th className='border-b-1 border-gray-300 border-r-1 py-4 px-4'>Category</th>
              <th className='border-b-1 border-gray-300 border-r-1 py-4 px-4'>qunatity</th>
              <th className='border-b-1 border-gray-300  py-4 px-4'>Action</th>
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
                    <td className='border-b-1 border-gray-300  border-r-1 px-2 xl:w-48'>
                      {
                        items.quantity
                      }
                    </td>
                    <td className='border-b-1 border-gray-300  py-2 px-2 xl:w-48'>
                        <button className='border-1' onClick={()=>handleOnEditClick(items._id)}>Edit</button>
                        <button className='border-1' onClick={()=>handleOnDeleteClick(items._id)}>Delete</button>
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