// server/routes/order.js
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

//get All order
router.get("/", ensureAuth, orderController.getAllOrder);
//Create a Order
router.post("/", ensureAuth, orderController.newOrder);
// //Edit a Order
// router.put("/:id", ensureAuth, orderController.editProduct);
// //Delete a Order
// router.delete("/:id", ensureAuth, orderController.deleteProduct);
// //Get a Order by ID
// router.get("/:id", ensureAuth, orderController.getProductById);

module.exports = router;
