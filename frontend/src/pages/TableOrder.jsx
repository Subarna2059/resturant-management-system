import React, { useEffect, useState } from 'react'
import Banner from '../components/partials/Banner'
import { axiosInstance } from '../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../actions/order-action'
import Loader from '../components/common/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from '../components/common/Modal'
import { setModalTrue } from '../actions/modal-action'

const TableOrder = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [dataForEdit, setDataForEdit] = useState()
    const [total, setTotal] = useState()
    const [category, setCategory] = useState()
    const [idForEdit, setIdForEdit] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const order = useSelector(state=>state.orderReducer)
    const modal = useSelector(state=>state.modalReducer)
    const getTableOrder = async() =>{
        setLoading(true)
        const res = await axiosInstance.get(`/order/get/${id}`)
        dispatch(getOrder(res.data.data))
        const totalPrice = res.data.data.reduce((acc, item) => acc + item.price, 0)
        setTotal(totalPrice)
        setLoading(false)
    }
    const clearBill= async(slug) => {
        try {
            const res = await axiosInstance.put(`/order/bill/clear/${slug}`)
            if(res) {
                navigate("/")
                toast("Bill cleared")
            }
        } catch {
            toast("Something went wrong")
        }
    }
    const onDeleteClick = async(id) => {
        try {
            const confirm = window.confirm("Do you want to delete the order?")
            const drink = ["cold drink","wine","beer","hard drink"]
            const res = await axiosInstance(`/order/get/individual/${id}`)
            const findDrink = drink.find(item =>item === res.data.data.category)
            if(confirm) {
                if(findDrink){
                    const deleteRes = await axiosInstance.delete(`/order/delete/drink/${id}/${res.data.data.quantity}`)
                    if(deleteRes) {
                        getTableOrder()
                        toast("Order deleted successfully")
                    }
                } else {
                    const res = await axiosInstance.delete(`/order/delete/${id}`)
                    if(res) {
                        getTableOrder()
                        toast("Order deleted successfully")
                    }
                }
            }
        } catch (e) {
            toast.error(e.message)
        }
    }
    const onEditClick = async(id) => {
        try{
            const res = await axiosInstance.get(`/order/get/individual/${id}`)
            const categoryRes = await axiosInstance.get("/category")
            if(res && categoryRes) {
                setDataForEdit(res.data.data)
                setCategory(categoryRes.data.data)
                dispatch(setModalTrue())
                setIdForEdit(id)
            } else {
                toast.error("Something went wrong")
            }
        } catch (e){
            toast.error(e.response.data.message || "Something went wrong")
        }
    }
    useEffect(()=>{
        getTableOrder();
    },[])
  return (
    <>
    {
        modal ? <Modal categoryList={category} dataForEdit={dataForEdit} title={"Edit Order"} idForEdit={idForEdit} />:
        <>
        </>
    }

        <Banner />
        {
            loading ? <> <div className='w-[100%] flex justify-center items-center xl:h-[30vh] '> <Loader />  </div> </>:
            <>
            {
                order.length > 0 ?
                <>
                <div className='w-[100%] flex items-center mt-14 flex-col'>
                <div className='text-bold text-2xl my-3 mt-4'>Table orders</div>
                <table className=''>
                <thead>
                <tr>
                <th className='border-b-1 border-gray-500 border-r-1 py-4 px-4'>Order</th>
                <th className='border-b-1 border-gray-500 border-r-1 py-4 px-4'>Quantity</th>
                <th className='border-b-1 border-gray-500 border-r-1 py-4 px-4'>Price</th>
                <th className='border-b-1 border-gray-500   py-4 px-4'>Action</th>
                </tr>
                </thead>
                { order.map((items, index)=>{
                    return(
                      <>
                      <tbody key={index} >
                      <tr className=''>
                      <td className='border-b-1 border-gray-500 border-r-1 my-2 px-2 xl:w-48' > {items.orderName} </td>
                      <td className='border-b-1 border-gray-500 border-r-1 my-2 px-2 xl:w-48' > {items.quantity} </td>
                      <td className='border-b-1 border-gray-500 border-r-1 my-2 px-2 xl:w-48' > {items.price} </td>
                      <td className='border-b-1 border-gray-500  px-2 xl:w-48'>
                      <button onClick={()=>onEditClick(items._id)} className='px-4 my-2 py-2 bg-blue-600 mr-3 cursor-pointer text-white rounded-md hover:bg-blue-700 transition'>Edit</button>
                      <button onClick={()=>onDeleteClick(items._id)} className='px-4 my-2 py-2 bg-red-600 text-white cursor-pointer rounded-md hover:bg-red-700 transition'>Delete</button>
                      </td>
                      </tr>
                      </tbody>
                      </>
                    )
                  })}
                </table>
                <div className='mt-4 xl:w-[38vw] flex justify-end '>
                    <div className='text-bold pr-2'>
                        Total:-
                    </div>
                    <div>
                        Rs.{total}
                    </div>
                    </div>
                <div className='my-4 xl:w-[38vw] flex justify-end '>
                    <button onClick={()=>clearBill(order[0]?.table)} className=' hover:border-3 rounded-lg text-white font-semibold  hover:border-green-700 cursor-pointer px-3 py-1 bg-green-600'>Clear Bill</button>
                </div>
                </div>

                    </>
                : <>
                <div className='w-[100%] mt-15 flex justify-center'>
                    No Record found
                    </div>
                    </>
            }
            </>
        }
    </>
  )
}

export default TableOrder