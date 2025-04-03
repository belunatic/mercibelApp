// server/routes/products.js
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const { ensureAuth } = require("../middleware/authMiddleware");

router.get("/", ensureAuth, productsController.getProducts);

module.exports = router;
