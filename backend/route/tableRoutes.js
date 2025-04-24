const express = require("express")
const { createTable } = require("../controller/tableContoller")
const router = express.Router()

router.post("/", createTable)


module.exports = router