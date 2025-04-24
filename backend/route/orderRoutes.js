const express = require("express")
const { createOrder, viewBill, clearBill, orderDrink, editOrder, deleteOrder, deleteAllOrder } = require("../controller/orderController")
const router = express.Router()

router.post("/create", createOrder)
router.post("/create/drink", orderDrink)
router.put("/update/:id", editOrder)
router.get("/bill/:id", viewBill)
router.put("/bill/clear/:id", clearBill)
router.delete("/delete/:id", deleteOrder)
router.delete("/bulk/delete/:id", deleteAllOrder)


module.exports = router