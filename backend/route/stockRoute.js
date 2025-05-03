const express = require("express");
const { createStock,getindividualStock, getStock, deleteStock, editStock } = require("../controller/stockRoutes");
const { checkRoleMiddleware, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/",authMiddleware,checkRoleMiddleware, createStock);
router.delete("/:id",authMiddleware,checkRoleMiddleware, deleteStock)
router.get("/",authMiddleware, getStock)
router.put("/:id",authMiddleware,checkRoleMiddleware, editStock)
router.get("/:id",authMiddleware,checkRoleMiddleware, getindividualStock)

module.exports = router