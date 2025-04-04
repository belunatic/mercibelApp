const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

module.exports = {
	getProducts: asyncHandler(async (req, res) => {
		let data = await Product.find();
		res.json(data);
	}),
};
