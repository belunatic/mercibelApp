const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

module.exports = {
	getProducts: asyncHandler(async (req, res) => {
		let data = await Product.find();
		res.json(data);
	}),
	createProduct: asyncHandler(async (req, res) => {
		let data = await Product.create(req.body);
		console.log(data);
		if (data) {
			res.status(201).json({ msg: "Product Added" });
		}
	}),
};
