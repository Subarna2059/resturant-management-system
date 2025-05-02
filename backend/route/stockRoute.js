const express = require("express");
const { createStock, getStock } = require("../controller/stockRoutes");
const router = express.Router();

router.post("/", createStock);
// router.delete("/:id")
router.get("/", getStock)

module.exports = router