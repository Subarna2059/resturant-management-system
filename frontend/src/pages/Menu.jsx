import React, { useEffect, useState } from 'react'
import Banner from '../components/partials/Banner'
import { toast } from 'react-toastify'
import { axiosInstance } from '../utils/APIcalls'
import Loader from '../components/common/Loader'
import Card from '../components/common/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getMenu } from '../actions/menu-action'
import { getCategory } from '../actions/category-action'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/common/Modal'
import { setModalTrue } from '../actions/modal-action'
import Addmodal from '../components/common/Addmodal'
import { setAddModalTrue } from '../actions/addModal-action'

const Menu = () => {
  const [loading, setLoading] = useState(false)
  const [dataForEdit, setDataForEdit] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modal = useSelector(state=>state.modalReducer)
  const addModal = useSelector(state=>state.addModalReducer)
  const menuList = useSelector(state => state.menuReducer)
  const categoryList = useSelector(state=>state.categoryReducer)
  const fetchMenu = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/menu")
      dispatch(getMenu(res.data.data))
      setLoading(false)
    } catch (e) {
      toast("Something went wrong")
    }
  }
  const fetchCategory = async() =>{
    try{
      setLoading(true)
      const res = await axiosInstance.get("/category")
      dispatch(getCategory(res.data.data))
      setLoading(false)
    } catch {
      navigate("/menu")
      toast("Failed to fetch categories")
    }
  }
  const setMenuAccordingToCategory = async (id) =>{
    try{
      setLoading(true)
      const res = await axiosInstance.get(`/menu/${id}`)
      if(res.data.data && res.data.data.length > 0){
      dispatch(getMenu(res.data.data))
      } else {
        toast("No items found")
      }
      setLoading(false)
    } catch {
      toast("Something went wrong")
    }
  }
  const showModal = () =>{
    dispatch(setModalTrue())
  }
  const showAddMenuModal = () => {
    dispatch(setAddModalTrue())
  }
  const onDeleteClick = async(id) =>{
    const confirm = window.confirm("Do you want to delete the item?")
    if(confirm) {
      const res = await axiosInstance.delete(`/menu/${id}`,{
        headers:{
          Authorization:`Bearer`
        }
      })
      if(res) {
        fetchMenu()
        toast("Data deleted successfully")
      } else {
        toast("Failed to delete data")
      }
    }
  }
  const onEditClick = async(id)=>{
    try{
      const res = await axiosInstance.get(`/menu/individual/${id}`)
      setDataForEdit(res.data.data)
      dispatch(setAddModalTrue())
    } catch {
      toast("Failed to get item for edit")
    }
  }
  useEffect(() => {
    fetchMenu(),
    fetchCategory()
  }, [])
  return (
    <>
    {
      addModal ?
      <Addmodal getmenu={()=>fetchMenu()} title={"Add menu"} dataToEdit= {dataForEdit}/> :
      <></>
    }
    {
      modal ? <Modal categoryList = {categoryList} title = {"Add order"} />:
      <>
      </>
    }
      <Banner />
      {
        loading ? <div className='xl:w-[99vw] flex items-center justify-center xl:h-[30vh]'><Loader /></div> :
          <>
            {
              menuList.length > 0 ?
                <>
                <div className='w-[100%] flex flex-col items-center mt-15'>
                  <div className='text-bold text-2xl my-3'>Menu</div>
                  {
                    categoryList.length >0 ?
                    <>
                    <div className='flex xl:w-[50vw] mt-3 justify-between'>
                    {
                      categoryList.map((items,index)=>{
                        return(
                          <button key={index} onClick={()=>setMenuAccordingToCategory(items._id)} className='rounded-md cursor-pointer font-semibold bg-gray-300 xl:w-[7vw] py-0.5'>{items.title}</button>
                        )
                      })
                    }
                    </div>
                    </>:<div>No category found</div>
                  }
                  <div className='xl:w-[85vw] flex justify-end'>
                    <button onClick={()=>showModal()} className=' mr-2 cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>Add order</button>
                    <button onClick={()=>showAddMenuModal()} className=' cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>Add menu</button>
                  </div>
                  </div>
                  <div className='w-[100%] flex flex-wrap justify-center mt-4'>
                    {
                      menuList.map((items, index) => {
                        return (
                          <>
                          <div  className='' key={index}>
                          <div className=' border-1 m-4 border-gray-300 rounded-xl shadow-xl' >
                            <Card src={"*"} content={items} />
                          </div>
                            <div className=' flex justify-end mr-6'>
                              <button onClick={()=>onEditClick(items._id)} className='px-4 py-2 bg-blue-600 mr-3 cursor-pointer text-white rounded-md hover:bg-blue-700 transition'>Edit</button>
                              <button onClick={()=>onDeleteClick(items._id)} className='px-4 py-2 bg-red-600 text-white cursor-pointer rounded-md hover:bg-red-700 transition'>Delete</button>
                            </div>
                            </div>
                            </>
                        )
                      })
                    }
                  </div>
                </>
                : <div>No Record Found</div>
            }
          </>

      }
    </>

  )
}

export default Menu