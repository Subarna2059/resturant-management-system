import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosInstance } from '../../utils/APIcalls'
import { useDispatch } from 'react-redux'
import { setModalFalse } from '../../actions/modal-action'
import { getLocalStorage } from '../../utils/storage'

export const AddStockModal = ({getStockData, dataToEdit, modalName}) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        title:"",
        quantity:"",
        category:"",
    })
    const categories = ["cold drink", "hard drink", "beer", "wine"]
    const handleOnChange = (e) => {
        setData({
            ...data,
            [e.name]:e.value
        })
    }
    const hideModal = () => {
        dispatch(setModalFalse())
    }
    const handleSubmit = async() =>{
        try{
            if(dataToEdit.title !="") {
                const res = await axiosInstance.put(`/stock/${ dataToEdit.id}`,{
                    title:data.title,
                    quantity:data.quantity,
                    category:data.category,
                },{
                    headers:{
                        Authorization:`Bearer ${getLocalStorage()}`
                    }
                })
                if(res) {
                    getStockData()
                    hideModal()
                    toast("Stock edited successfully")
                }
            } else {
                const res = await axiosInstance.post("/stock",{
                    title:data.title,
                    quantity:data.quantity,
                    category:data.category,
                },{
                    headers:{
                        Authorization:`Bearer ${getLocalStorage()}`
                    }
                })
                if(res) {
                    getStockData()
                    hideModal()
                    toast("Stock added successfully")
                }
            }
        } catch {
            toast("Something went wrong")
        }
    }
    useEffect(()=>{
        if(dataToEdit && dataToEdit.title) {
            setData({
                ...data,
                title:dataToEdit.title,
                quantity:dataToEdit.quantity,
                category:dataToEdit.category
            })
            
        } else {
            setData({
                ...data,
                title:"",
                quantity:"",
                category:categories[0]
            })
        }
    },[])
  return (
    <>
    <div className='bg-black z-10 opacity-50 w-[100vw] h-[100vh] fixed top-0 left-0'>
    </div>
        <div className=' fixed z-30  top-0 left-0  w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='xl:w-[30vw] bg-white xl:h-[40vh]'>
                <div className='w-[100%] h-[100%] flex flex-col items-center'>
                <div className=' text-xl w-[100%] flex justify-end'>
                    <i onClick={() => hideModal()} className=" cursor-pointer bi bi-x mr-4 "></i>
                </div>
                    <div>
                        {modalName}
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">Title</label>
                            <input value={data.title} onChange={(e)=>handleOnChange(e.target)} type="text" className='border-1 block' name='title'/>
                        </div>
                        <div>
                            <label htmlFor="">quantity</label>
                            <input value={data.quantity} onChange={(e)=>handleOnChange(e.target)} type="number" min={0} className='border-1 block' name='quantity'/>
                        </div>
                        <div>
                            <label htmlFor="">Category</label>
                            <select name='category' value={data.category} onChange={(e)=>handleOnChange(e.target)}>
                                {
                                    categories.map((items, index) => {
                                        return (
                                    <       option key={index} value={items}>{items}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='w-[100%]  flex justify-end'>
                    <button onClick={() => handleSubmit()} className='mr-4 px-6 py-2 cursor-pointer rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out'>Sumbit</button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
