const express = require("express");
const { createMenu, updateMenu, getMenu,getIndividualMenu, deleteMenu, getMenuAccordingToCategory } = require("../controller/menuController");
const router = express.Router()
const multer = require("multer");
const { authMiddleware, checkRoleMiddleware } = require("../middleware/authMiddleware");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
})
const upload = multer({storage:storage})
router.post("/", upload.single("file"),authMiddleware,checkRoleMiddleware, createMenu)
router.put("/:id", upload.single("file"),authMiddleware,checkRoleMiddleware, updateMenu)
router.get("/", getMenu)
router.get("/individual/:id",authMiddleware, getIndividualMenu)
router.get("/:id",  getMenuAccordingToCategory)
router.delete("/:id",authMiddleware,checkRoleMiddleware, deleteMenu)


module.exports = router