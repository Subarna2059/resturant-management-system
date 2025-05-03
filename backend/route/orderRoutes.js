const express = require("express")
const { createOrder,deleteOrderDrink, viewBill,getIndividualOrder, clearBill, orderDrink, editOrder, deleteOrder, deleteAllOrder, getOrder, getIndividualTableOrder } = require("../controller/orderController")
const { authMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/create",authMiddleware, createOrder)
router.post("/create/drink",authMiddleware, orderDrink)
router.delete("/delete/drink/:id/:quantity",authMiddleware, deleteOrderDrink)
router.put("/update/:id",authMiddleware, editOrder)
router.get("/bill/:id",authMiddleware, viewBill)
router.put("/bill/clear/:slug",authMiddleware, clearBill)
router.delete("/delete/:id",authMiddleware, deleteOrder)
router.delete("/bulk/delete/:id",authMiddleware, deleteAllOrder)
router.get("/get",authMiddleware, getOrder)
router.get("/get/individual/:id",authMiddleware, getIndividualOrder)
router.get("/get/:id",authMiddleware, getIndividualTableOrder)


module.exports = router