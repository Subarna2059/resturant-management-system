const express = require("express")
const { register, login,getUser } = require("../controller/authController")
const { authMiddleware, checkRoleMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()


router.post("/register",authMiddleware, checkRoleMiddleware, register)
router.post("/login", login)
router.get("/users",authMiddleware, getUser)


module.exports = router