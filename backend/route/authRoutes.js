const express = require("express")
const { register, login,getUser, deleteUser } = require("../controller/authController")
const { authMiddleware, checkRoleMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()


router.post("/register",authMiddleware, checkRoleMiddleware, register)
router.post("/login", login)
router.get("/users",authMiddleware, getUser)
router.delete("/staff/delete/:id", authMiddleware, checkRoleMiddleware, deleteUser)


module.exports = router