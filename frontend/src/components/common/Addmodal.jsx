import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosInstance } from '../../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import { insertMenu } from '../../actions/insertMenu-action'
import { setAddModalFalse } from '../../actions/addModal-action'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../../utils/storage'

const Addmodal = ({getMenu, title,dataToEdit}) => {
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const insertedData = useSelector(state=>state.insertMenuReducer)
    const getCategory = async() => {
        try{
            const res = await axiosInstance.get("/category", {
                headers:{
                    Authorization:`Bearer ${getLocalStorage()}`
                }
            })
            setCategory(res.data.data)
        } catch (e) {
            toast(e.message)
        }
    }
    const handleOnChange = (e) =>{
        dispatch(insertMenu(e.target))
        
    }
    const handleOnSubmit = async() => {
        const formData = new FormData()
            formData.append("title",insertedData.title)
            formData.append("description", insertedData.description)
            formData.append("price", insertedData.price)
            formData.append("category", insertedData.category)
            formData.append("file", insertedData.file)
        if(dataToEdit) {
            try{
                if(insertedData.title==""||insertedData.description==""||insertedData.price==""||insertedData.category=="") {
                    toast("Please fill the required fields")
                } else {
                    const res = await axiosInstance.put(`/menu/${dataToEdit._id}`,formData,{
                        headers:{
                            Authorization:`Bearer ${getLocalStorage()}`,
                        }
                    })
                    if(res) {
                        getMenu
                        dispatch(setAddModalFalse())
                        toast("Data successfully edited")
                    } else {
                        toast("Data update failed")
                    }
                }
            } catch {
                toast("Failed to update data")
            }
        } else {
            if(insertedData.title==""||insertedData.description==""||insertedData.price==""||insertedData.category==""||insertedData.file==null) {
                toast("All fields are required")
            } else {
                try{
                    const res = await axiosInstance.post("/menu",formData,{
                        headers:{
                            Authorization:`Bearer ${getLocalStorage()}`,
                        }
                    })
                    if(res) {
                        getMenu
                        dispatch(setAddModalFalse())
                        navigate("/menu")
                        toast("Menu item added successfully")
                    } else {
                        toast("Failed to insert")
                    }
                } catch(e) {
                    toast(e.message)
                }
            }
        }
        }
    const hideAddModal = () => {
        dispatch(setAddModalFalse())
    }
    useEffect(()=>{
        getCategory()
        if(dataToEdit) {
            dispatch(insertMenu({name:"title", value:dataToEdit.title}))
            dispatch(insertMenu({name:"description", value:dataToEdit.description}))
            dispatch(insertMenu({name:"category", value:dataToEdit.category}))
            dispatch(insertMenu({name:"price", value:dataToEdit.price}))
            // dispatch(insertMenu({name:"file", value:dataToEdit.file}))
        }
    },[])
  return (
    <>
        <div className='fixed top-0 left-0 bg-black opacity-50 z-10 w-[100vw] h-[100vh]'>
        </div>
        <div className='fixed z-20 border-1 xl:w-[30vw] xl:h-[45vh] bg-white left-130 top-50'>
        <div className=' text-xl  flex justify-end'>
                    <i onClick={() => hideAddModal()} className=" cursor-pointer bi bi-x mr-4 "></i>
                </div>
            <div className='flex items-center flex-col'>
                <div className='w-[100%] flex justify-center'>
                    {title}
                </div>
                <div>
                    <div>
                        <label htmlFor="">Title</label>
                        <input required value={insertedData.title} onChange={(e)=>handleOnChange(e)} name='title' type="text" className='border-1 block' />
                    </div>
                    <div>
                        <label htmlFor="">Description</label>
                        <input required value={insertedData.description} onChange={(e)=>handleOnChange(e)} type="text" className='border-1 block' name='description'/>
                    </div>
                    <div>
                        <label htmlFor="">price</label>
                        <input required value={insertedData.price} onChange={(e)=>handleOnChange(e)} type="number" min="1" className='border-1 block' name='price'/>
                    </div>
                    <div>
                        <label htmlFor="">Category</label>
                        <select required  onClick={(e)=>handleOnChange(e)} name="category" id="">
                            {
                                category.length>0 ?
                                <>
                                {
                                    category.map((items,index)=>{
                                        return(
                                            <option key={index}>{items.title}</option>
                                        )
                                    })
                                }
                                </>:<>No record found</>
                            }
                        </select>
                        <input onChange={(e)=>handleOnChange(e)} required type="file" className='inline-block border border-gray-400 px-4 py-2 rounded cursor-pointer' name="file" />
                    </div>
                </div>
            </div>
            <div className='w-[100%]  flex justify-end'>
                    <button onClick={() => handleOnSubmit()} className='mr-4 px-6 py-2 cursor-pointer rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out'>Sumbit</button>
                </div>
        </div>
    </>
  )
}

export default Addmodal