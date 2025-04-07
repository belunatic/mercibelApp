// server/routes/products.js
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const { ensureAuth } = require("../middleware/authMiddleware");

//get All Products
router.get("/", ensureAuth, productsController.getProducts);
//Create a Product
router.post("/", ensureAuth, productsController.createProduct);

module.exports = router;
