// server/routes/products.js
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/authMiddleware");
const productsController = require("../controllers/productsController");

//get All Products
router.get("/", ensureAuth, productsController.getProducts);
//Create a Product
router.post("/", ensureAuth, productsController.createProduct);
//Edit a Product
router.put("/:id", ensureAuth, productsController.editProduct);
//Delete a Product
router.delete("/:id", ensureAuth, productsController.deleteProduct);
//Get a Product by ID
router.get("/:id", ensureAuth, productsController.getProductById);

module.exports = router;
