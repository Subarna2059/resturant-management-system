const express = require("express")
const { createCategory, allCategory, deleteCategory, getCategory } = require("../controller/categoryController")
const router = express.Router()

router.post("/", createCategory)
router.get("/", allCategory)
router.get("/:slug", getCategory)
router.delete("/:id", deleteCategory)

module.exports = router