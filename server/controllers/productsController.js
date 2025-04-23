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
	editProduct: asyncHandler(async (req, res) => {
		console.log("These are", req.body, req.user.id);
		let data = await Product.findByIdAndUpdate(req.params.id, {
			$set: {
				...req.body,
				lastUpdateDate: new Date(),
				lastUpdateBy: req.user.id,
			},
		});
		console.log("This is data", data);
		if (data) {
			res.status(201).json({ msg: "Product Updated" });
		} else {
			res.status(404).json({ msg: "Product not found" });
		}
	}),
	deleteProduct: asyncHandler(async (req, res) => {
		let data = await Product.findByIdAndDelete(req.params.id);
		if (data) {
			res.status(201).json({ msg: "Product Deleted" });
		} else {
			res.status(404).json({ msg: "Product not found" });
		}
	}),
	getProductById: asyncHandler(async (req, res) => {
		let data = await Product.findById(req.params.id);
		if (data) {
			res.status(200).json(data);
		} else {
			res.status(404).json({ msg: "Product not found" });
		}
	}),
};
