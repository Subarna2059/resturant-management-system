const express = require("express")
const { createTable, getTables } = require("../controller/tableContoller")
const { authMiddleware, checkRoleMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/",authMiddleware,checkRoleMiddleware, createTable)
router.get("/",authMiddleware,checkRoleMiddleware, getTables)


module.exports = router