const express = require("express");
const { createStock } = require("../controller/stockRoutes");
const router = express.Router();

router.post("/", createStock);

module.exports = router