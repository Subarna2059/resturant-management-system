const { Menu, Order, Table, Stock } = require("../model/schema")

const createOrder = async(req,res) => 
{
    let{tableName, menuName, quantity} = req.body
    tableName = tableName.trim().toLowerCase();
    menuName = menuName.trim().toLowerCase();
    try{
        const findMenuItem = await Menu.findOne({title:menuName})
        const findTable = await Table.findOne({title:tableName})
        if(findMenuItem && findTable) {
            const insertOrder = await new Order({
                orderName:findMenuItem.title,
                quantity:quantity,
                price:findMenuItem.price*quantity,
                table:tableName,
                category:findMenuItem.category
            })
            const updateTable = await Table.findByIdAndUpdate({_id:findTable._id},{billCleared:false, tableOccupied:true}, {new:true})
            const save = await insertOrder.save();
            if(save && updateTable) {
                res.status(200).json({
                    message:"Order placed successful",
                    data:save,
                })
            }
        } else {
            res.status(404).json({
                message:"Table or menu not found"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}

const orderDrink = async(req,res) => {
    let {drinkName, quantity, tableName} = req.body
    drinkName = drinkName.trim().toLowerCase()
    tableName = tableName.trim().toLowerCase()
    try {
        if(typeof(drinkName) == "string" && typeof(tableName) == "string" && Number.isInteger(quantity)) {
            const checkStock = await Stock.findOne({title:drinkName})
            if(checkStock) {
                if(quantity <= checkStock.quantity) {
                    const updateStock = await Stock.findByIdAndUpdate({_id:checkStock._id}, {quantity:checkStock.quantity - quantity})
                    const findMenu = await Menu.findOne({title:drinkName})
                    const findTable = await Table.findOne({title:tableName})
                    if(updateStock && findMenu && findTable) {
                        const insertColdDrinkOrder = await new Order({
                            orderName:drinkName,
                            quantity:quantity,
                            price:quantity * findMenu.price,
                            category:findMenu.category,
                            table:tableName,
                        })
                        const save = await insertColdDrinkOrder.save();
                        const updateTable = await Table.findByIdAndUpdate({_id:findTable.id},{billCleared:false, tableOccupied:true})
                        if(save && updateTable) {
                            res.status(200).json({
                                message:"Drink ordered successfully",
                                data:save
                            })
                        } else {
                            res.status(500).json({
                                message:"Something went wrong"
                            })
                        }
                    } else {
                        res.status(500).json({
                            message:"Something went wrong"
                        })
                    }
                } else {
                    res.status(409).json({
                        message:"Stock not available"
                    })
                }
            }else{
                res.status(409).json({
                    message:`No stock with name ${drinkName}`
                })
            }
        } else {
            res.status(409).json({
                message:'Invalid input'
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}

const viewBill = async(req, res) =>{
    const{id} = req.params
    try{
        const findTable = await Table.findOne({_id:id})
        console.log(findTable);
        if(!findTable.billCleared) {
            const findBill = await Order.find({table:findTable.title})
            res.status(200).json({
                data:findBill
            })
        }else{
            res.status(404).json({
                message:"No pending bill found"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}

const clearBill = async(req, res) => {
    const {id} = req.params
    try{
        const findTable = await Table.findOne({_id:id});
        if(findTable && findTable.billCleared == false) {
            const clearBill = await Table.findByIdAndUpdate({_id:id},{billCleared:true, tableOccupied:false});
            if(clearBill) {
                const deleteOrder = await Order.deleteMany({table:findTable.title})
                res.status(200).json({
                    message:"Bill cleared successfully"
                })
            }
        } else {
            res.status(404).json({
                message:"Table not found"
            })
        }
    } catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}

const editOrder = async(req,res) =>{
    let {orderName, quantity} =req.body
    orderName = orderName.trim().toLowerCase()
    const {id} = req.params
    try{
        const findOrderInMenu = await Menu.findOne({title:orderName})
        if(findOrderInMenu) {
            const updateOrder = await Order.findByIdAndUpdate({_id:id},{
                    orderName:findOrderInMenu.orderName,
                    quantity:quantity,
                    price:findOrderInMenu.price*quantity,
                    category:findOrderInMenu.category,
                }, {new:true})
                res.status(200).json({
                    message:"Order updated successfully",
                    data:updateOrder
                })
            } else {
            res.status(409).json({
                message:"Invalid order name"
            })
        }
    }catch(e) {
        res.status(500).json({
            message:e.message
        })
    }
}

const deleteOrder = async(req,res)=>{
    const {id} = req.params
    try{
        const findOrder = await Order.findOne({_id:id}) 
        const deleteOrder = await Order.findByIdAndDelete({_id:id})
        if(deleteOrder) {
            const findTable = await Order.findOne({table:findOrder.table})
            if(!findTable) {
                const updateTable = await Table.findOneAndUpdate({title:findOrder.table},{$set:{billCleared:true, tableOccupied:false}})
                res.status(200).json({
                    message:"Order cancelled successfully"
                })
            } else {
                res.status(200).json({
                    message:"Order cancelled successfully"
                })
            }
        } else {
            res.status(500).json({
                message:"Something went wrong"
            })
        }
    } catch (e) {
        res.status(500).json({
            message:e.message
        })
    }
}

const deleteAllOrder = async(req,res) =>{ 
    const {id} = req.params
    try {
        const getTable = await Table.findOne({_id:id});
        if(getTable) {
            const deleteAllOrder = await Order.deleteMany({table:getTable.title})
            if(deleteAllOrder.deletedCount > 0) {
                const updateTable = await Table.findByIdAndUpdate({_id:getTable._id},{billCleared:true, tableOccupied:false})
                res.status(200).json({
                    mesage:"Orders cancelled successfully"
                })
            } else {
                res.status(500).json({
                    message:"Something went wrong"
                })
            }
        } else {
            res.status(404).json({
                message:"Table not found"
            })
        }
    } catch (e) {
        res.status(500).json({
            message:e.message
        })
    }
}
module.exports = {createOrder, viewBill, clearBill, orderDrink, editOrder, deleteOrder, deleteAllOrder}