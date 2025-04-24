const express = require("express")
const { createCategory, allCategory, deleteCategory } = require("../controller/categoryController")
const router = express.Router()

router.post("/", createCategory)
router.get("/", allCategory)
router.delete("/:id", deleteCategory)

module.exports = router