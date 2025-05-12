// server/routes/products.js
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { ensureAuth } = require("../middleware/authMiddleware");

//get All customer
router.get("/", ensureAuth, customerController.getCustomer);
// Create a Product
router.post("/", ensureAuth, customerController.newCustomer);
//Edit a CUstomer
router.put("/:id", ensureAuth, customerController.editCustomer);
//Delete a CUstomer
router.delete("/:id", ensureAuth, customerController.deleteCustomer);
//Get a CUstomer by ID
router.get("/:id", ensureAuth, customerController.getCustomerById);

module.exports = router;
