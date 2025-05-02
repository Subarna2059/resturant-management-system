const express = require("express")
const { createOrder,deleteOrderDrink, viewBill,getIndividualOrder, clearBill, orderDrink, editOrder, deleteOrder, deleteAllOrder, getOrder, getIndividualTableOrder } = require("../controller/orderController")
const router = express.Router()

router.post("/create", createOrder)
router.post("/create/drink", orderDrink)
router.delete("/delete/drink/:id/:quantity", deleteOrderDrink)
router.put("/update/:id", editOrder)
router.get("/bill/:id", viewBill)
router.put("/bill/clear/:slug", clearBill)
router.delete("/delete/:id", deleteOrder)
router.delete("/bulk/delete/:id", deleteAllOrder)
router.get("/get", getOrder)
router.get("/get/individual/:id", getIndividualOrder)
router.get("/get/:id", getIndividualTableOrder)


module.exports = router