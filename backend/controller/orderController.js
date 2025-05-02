const { Menu, Order, Table, Stock } = require("../model/schema")

const createOrder = async (req, res) => {
    let { tableName, menuName, quantity } = req.body
    tableName = tableName.trim().toLowerCase();
    menuName = menuName.trim().toLowerCase();
    try {
        const findMenuItem = await Menu.findOne({ title: menuName })
        const findTable = await Table.findOne({ title: tableName })
        if (quantity && quantity > 0 && quantity < 50) {
            if (findMenuItem && findTable) {
                const insertOrder = await new Order({
                    orderName: findMenuItem.title,
                    quantity: quantity,
                    price: findMenuItem.price * quantity,
                    table: tableName,
                    category: findMenuItem.category
                })
                const updateTable = await Table.findByIdAndUpdate({ _id: findTable._id }, { billCleared: false, tableOccupied: true }, { new: true })
                const save = await insertOrder.save();
                if (save && updateTable) {
                    res.status(200).json({
                        message: "Order placed successful",
                        data: save,
                    })
                }
            } else {
                res.status(404).json({
                    message: "Table or menu not found"
                })
            }
        } else {
            res.status(409).json({
                message: "Invalid input"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const orderDrink = async (req, res) => {
    let { drinkName, quantity, tableName } = req.body
    drinkName = drinkName.trim().toLowerCase()
    tableName = tableName.trim().toLowerCase()
    try {
        if (typeof (drinkName) == "string" && typeof (tableName) == "string" && Number(quantity)) {
            const checkStock = await Stock.findOne({ title: drinkName })
            if (checkStock) {
                if (quantity <= checkStock.quantity) {
                    const updateStock = await Stock.findByIdAndUpdate({ _id: checkStock._id }, { quantity: checkStock.quantity - quantity })
                    const findMenu = await Menu.findOne({ title: drinkName })
                    const findTable = await Table.findOne({ title: tableName })
                    if (updateStock && findMenu && findTable) {
                        const insertColdDrinkOrder = await new Order({
                            orderName: drinkName,
                            quantity: quantity,
                            price: quantity * findMenu.price,
                            category: findMenu.category,
                            table: tableName,
                        })
                        const save = await insertColdDrinkOrder.save();
                        const updateTable = await Table.findByIdAndUpdate({ _id: findTable.id }, { billCleared: false, tableOccupied: true })
                        if (save && updateTable) {
                            res.status(200).json({
                                message: "Drink ordered successfully",
                                data: save
                            })
                        } else {
                            res.status(500).json({
                                message: "Something went wrong"
                            })
                        }
                    } else {
                        res.status(500).json({
                            message: "Something went wrong"
                        })
                    }
                } else {
                    res.status(409).json({
                        message: "Stock not available"
                    })
                }
            } else {
                res.status(409).json({
                    message: `No stock with name ${drinkName}`
                })
            }
        } else {
            res.status(409).json({
                message: 'Invalid input'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const viewBill = async (req, res) => {
    const { id } = req.params
    try {
        const findTable = await Table.findOne({ _id: id })
        console.log(findTable);
        if (!findTable.billCleared) {
            const findBill = await Order.find({ table: findTable.title })
            res.status(200).json({
                data: findBill
            })
        } else {
            res.status(404).json({
                message: "No pending bill found"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const clearBill = async (req, res) => {
    const { slug } = req.params
    try {
        const findTable = await Table.findOne({ title: slug });
        if (findTable && findTable.billCleared == false) {
            const clearBill = await Table.findByIdAndUpdate({ _id: findTable._id }, { billCleared: true, tableOccupied: false });
            if (clearBill) {
                const deleteOrder = await Order.deleteMany({ table: findTable.title })
                res.status(200).json({
                    message: "Bill cleared successfully"
                })
            }
        } else {
            res.status(404).json({
                message: "Table not found"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const editOrder = async (req, res) => {
    let { orderName, quantity, table } = req.body
    orderName = orderName.trim().toLowerCase()
    table = table.trim().toLowerCase()
    const { id } = req.params
    try {
        const findOrderInMenu = await Menu.findOne({ title: orderName })
        if (findOrderInMenu) {
            const updateOrder = await Order.findByIdAndUpdate({ _id: id }, {
                orderName: findOrderInMenu.title,
                quantity: quantity,
                table:table,
                price: findOrderInMenu.price * quantity,
                category: findOrderInMenu.category,
            }, { new: true })
            if(updateOrder) {
                res.status(200).json({
                    message: "Order updated successfully",
                    data: updateOrder
                })
            } else {
                res.status(500).json({
                    message: "Order updated failed",
                    data: updateOrder
                })
            }
        } else {
            res.status(409).json({
                message: "Invalid order name"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        const findOrder = await Order.findOne({ _id: id })
        const deleteOrder = await Order.findByIdAndDelete({ _id: id })
        if (deleteOrder) {
            const findTable = await Order.findOne({ table: findOrder.table })
            if (!findTable) {
                const updateTable = await Table.findOneAndUpdate({ title: findOrder.table }, { $set: { billCleared: true, tableOccupied: false } })
                res.status(200).json({
                    message: "Order cancelled successfully"
                })
            } else {
                res.status(200).json({
                    message: "Order cancelled successfully"
                })
            }
        } else {
            res.status(500).json({
                message: "Something went wrong"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const deleteAllOrder = async (req, res) => {
    const { id } = req.params
    try {
        const getTable = await Table.findOne({ _id: id });
        if (getTable) {
            const deleteAllOrder = await Order.deleteMany({ table: getTable.title })
            if (deleteAllOrder.deletedCount > 0) {
                const updateTable = await Table.findByIdAndUpdate({ _id: getTable._id }, { billCleared: true, tableOccupied: false })
                res.status(200).json({
                    mesage: "Orders cancelled successfully"
                })
            } else {
                res.status(500).json({
                    message: "Something went wrong"
                })
            }
        } else {
            res.status(404).json({
                message: "Table not found"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const getOrder = async (req, res) => {
    try {
        const getOrders = await Order.find()
        if (getOrders.length > 0) {
            res.status(200).json({
                messgae: "Data fetched successful",
                data: getOrders
            })
        } else {
            res.status(200).json({
                message: "No record found"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const getIndividualTableOrder = async (req, res) => {
    const { id } = req.params
    try {
        const getTable = await Table.findOne({ _id: id })
        if (id && getTable) {
            const getTableOrder = await Order.find({ table: getTable.title })
            if (getTableOrder) {
                res.status(200).json({
                    message: "Data fetcched successful",
                    data: getTableOrder
                })
            } else {
                res.status(200).json({
                    message: "No data found"
                })
            }
        } else {
            res.status(409).json({
                message: "invalid table"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const getIndividualOrder = async(req,res) => {
    const {id} = req.params
    try{
        const data = await Order.findOne({_id:id})
        if(data) {
            res.status(200).json({
                message:"Data fetched successfully",
                data:data
            })
        } else {
            res.status(200).json({
                message:"Data not found"
            })
        }
     } catch (e) {
        res.json(500).json({
            message:e.message
        })
    } 
}
const deleteOrderDrink = async(req, res) => {
    const {id, quantity} = req.params
    try{
        const menuDetails = await Order.findOne({_id:id})
        console.log(menuDetails);
        const stock = await Stock.findOne({title:menuDetails.orderName})
        const updateStock = await Stock.findByIdAndUpdate({_id:stock._id},{quantity:stock.quantity + Number(quantity)}, {new:true})
        if(updateStock) {
            const find =  await Order.findOne({table:menuDetails.table})
            if(find) {
                const updateOrderList = await Order.findByIdAndDelete({_id:id})
                const updateTable = await Table.findOneAndUpdate({title:menuDetails.table},{billCleared:true, tableOccupied:false})
                if(updateTable) {
                    res.status(200).json({
                        message:"Order removed successfully"
                    })
                }  else {
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
module.exports = { createOrder,deleteOrderDrink, viewBill,getIndividualOrder, clearBill, orderDrink, editOrder, deleteOrder, deleteAllOrder, getOrder, getIndividualTableOrder }