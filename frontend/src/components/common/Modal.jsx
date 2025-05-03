import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalFalse } from '../../actions/modal-action'
import { toast } from 'react-toastify'
import { axiosInstance } from '../../utils/APIcalls'
import { insertOrder } from '../../actions/insertOrder-action'
import { selectedItems } from '../../actions/selectedItems-action'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../../utils/storage'

const Modal = ({ categoryList, title, dataForEdit, idForEdit }) => {
    const dispatch = useDispatch()
    const [tables, setTables] = useState([])
    const menuList = useSelector(state => state.selectedItemsReducer)
    const selectedData = useSelector(state => state.insertOrderReducer)
    const navigate = useNavigate()
    const hideModal = () => {
        dispatch(setModalFalse())
    }
    const onCategoryChange = async (e) => {
        try {
            const res = await axiosInstance.get(`/category/${e.target.value}`)
            const id = res.data.data._id
            const menuRes = await axiosInstance.get(`/menu/${id}`)
            dispatch(selectedItems(menuRes.data.data))
        } catch {
            toast("Failed to fetch menu items")
        }
    }
    const onItemsSelect = (e) => {
        dispatch(insertOrder(e.target))
    }
    const firstRenderMenu = async () => {
        try {
            if(dataForEdit && dataForEdit.orderName != "" ) {
            const res = await axiosInstance.get(`/category/${selectedData.category}`)
            const id = await res.data.data._id
            const menuRes = await axiosInstance.get(`/menu/${id}`)
            dispatch(selectedItems(menuRes.data.data))
        } else {
            const res = await axiosInstance.get(`/category/${categoryList[0].title}`)
            const id = res.data.data._id
            const menuRes = await axiosInstance.get(`/menu/${id}`)
            dispatch(selectedItems(menuRes.data.data))
            }
        } catch {
            toast("Failed to fetch menu items")
        }
    }
    const handleOnSubmit = async() =>{
        const drinkCategory = ["hard drink","cold drink", "beer", "wine"]
        const findDrinkOrder = drinkCategory.find(items=>items == selectedData.category)
        try{
            if(findDrinkOrder) {
                const res = await axiosInstance.post("/order/create/drink",{
                    tableName:selectedData.table,
                    drinkName:selectedData.menu,
                    quantity:selectedData.quantity,
                },{
                    headers:{
                        Authorization:`Bearer`
                    }
                })
                if(res) {
                    navigate("/menu")
                    dispatch(setModalFalse())
                    toast("Order successfully added")
                } else {
                    toast("Order failed")
                }
            } else {
                if(dataForEdit) {
                    const res = await axiosInstance.put(`/order/update/${idForEdit}`,{
                        orderName:selectedData.menu,
                        table:selectedData.table,
                        quantity:selectedData.quantity
                    },{
                        headers:{
                            Authorization:`Bearer ${getLocalStorage()}`
                        }
                    })
                    if (res) {
                        dispatch(setModalFalse())
                        toast("Order updated successfully")

                    }
                } else {
                    const res = await axiosInstance.post("/order/create",{
                        tableName:selectedData.table,
                        menuName:selectedData.menu,
                        quantity:selectedData.quantity,
                    },{
                        headers:{
                            Authorization:`Bearer ${getLocalStorage()}`
                        }
                    })
                    if(res) {
                        navigate("/menu")
                        dispatch(setModalFalse())
                        toast("Order successfully added")
                    } else {
                        toast("Order failed")
                    }
                }
            }
        } catch(e) {
            toast(e.message)
        }
    }
    const getTableList = async() => {
        try{
            const res = await axiosInstance.get('/table')
            setTables(res.data.data)
        } catch {
            toast("Something went wrong")
        }
    }
    useEffect(() => {
        firstRenderMenu(),
        getTableList()
        if(dataForEdit && dataForEdit.orderName != "") {
            console.log(dataForEdit.orderName);
            dispatch(insertOrder({name:"menu", value:dataForEdit.orderName}))
            dispatch(insertOrder({name:"category", value:dataForEdit.category}))
            dispatch(insertOrder({name:"table", value:dataForEdit.table}))
            dispatch(insertOrder({name:"quantity", value:dataForEdit.quantity}))
            dispatch(insertOrder({name:"price", value:dataForEdit.price}))
        } else {
            dispatch(insertOrder({name:"menu", value:menuList[0]?.title}))
            dispatch(insertOrder({name:"category", value:categoryList[0].title}))
            dispatch(insertOrder({name:"table", value:"table1"}))
            dispatch(insertOrder({name:"quantity", value:0}))
            dispatch(insertOrder({name:"price", value:menuList[0]?.price}))
        }
    }, [])
    return (
        <>
            <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black z-10 opacity-50'>
            </div>
            <div className=' rounded-xl  bg-white xl:w-[30vw] xl:h-[40vh] left-125 top-50 fixed  z-20'>
                <div className=' text-xl  flex justify-end'>
                    <i onClick={() => hideModal()} className=" cursor-pointer bi bi-x mr-4 "></i>
                </div>
                <div className='flex flex-col items-center ' >
                    <div className=' text-xl flex items-center justify-center  font-semibold'>
                        <div>
                            {title}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="block">Choose category</label>
                            <select value={selectedData.category}  onChange={(e) =>{onItemsSelect(e), onCategoryChange(e)}} className='block border-none transition-all duration-300 ease-in-out cursor-pointer' name="category" >
                                {
                                    categoryList && categoryList.length > 0 ?
                                        categoryList.map((items, index) => {
                                            return (
                                                <option key={index} value={items.title}>{items.title}</option>
                                            )
                                        })
                                        : <option>No items found</option>
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="block">Choose item</label>
                            <select value={selectedData ? selectedData.menu:null} onChange={(e) => onItemsSelect(e)} className='block border-none transition-all duration-300 ease-in-out cursor-pointer' name="menu" >
                                {
                                    menuList && menuList.length > 0 ?
                                        menuList.map((items, index) => {
                                            return (
                                                <option key={index} value={items.title}>{items.title}</option>
                                            )
                                        })
                                        : <option>No items found</option>
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="block">Choose table</label>
                            <select value={selectedData.table} onChange={(e) => onItemsSelect(e)} className='block border-none transition-all duration-300 ease-in-out cursor-pointer' name="table" >
                                {
                                    tables?.length > 0 ?
                                        tables?.map((items, index) => {
                                            return (
                                                <option value={items.title} key={index}>{items?.title}</option>
                                            )
                                        })
                                        : <option>No items found</option>
                                }
                            </select>
                        </div>
                        <div>
                            <label>Quantity</label>
                            <input value={selectedData.quantity} onChange={(e)=>onItemsSelect(e)} type="number" name='quantity' className='border-1' min="0" max="50"/>
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

export default Modal