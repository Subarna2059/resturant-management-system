const express = require("express")
const { createTable, getTables } = require("../controller/tableContoller")
const router = express.Router()

router.post("/", createTable)
router.get("/", getTables)


module.exports = router