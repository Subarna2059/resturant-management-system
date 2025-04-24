const express = require("express");
const { createMenu, updateMenu, getMenu, deleteMenu, getMenuAccordingToCategory } = require("../controller/menuController");
const router = express.Router()
const multer = require("multer");
const { authMiddleware, checkRoleMiddleware } = require("../middleware/authMiddleware");
const upload = multer({
    dest:"upload"
})
router.post("/", upload.single("file"),authMiddleware, createMenu)
router.put("/:id", upload.single("file"),authMiddleware, updateMenu)
router.get("/", authMiddleware, checkRoleMiddleware,  getMenu)
router.get("/:id",  getMenuAccordingToCategory)
router.delete("/:id",authMiddleware, deleteMenu)


module.exports = router