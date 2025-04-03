// server/routes/products.js
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/authMiddleware");

router.get("/", ensureAuth, (req, res) => {
	res.send("Hello World");
});

module.exports = router;
