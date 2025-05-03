const express = require("express")
const { createCategory, allCategory, deleteCategory, getCategory } = require("../controller/categoryController")
const { authMiddleware, checkRoleMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/",authMiddleware,checkRoleMiddleware, createCategory)
router.get("/", allCategory)
router.get("/:slug",authMiddleware, getCategory)
router.delete("/:id",authMiddleware,checkRoleMiddleware, deleteCategory)

module.exports = router