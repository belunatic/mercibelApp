const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const customerRoute = require("./routes/customers");
const OrderRoute = require("./routes/orders");
const connectDB = require("./config/database");
const { errorHandler } = require("./middleware/errorMiddleware");
const { ensureAuth } = require("./middleware/authMiddleware");

require("dotenv").config({ path: "./config/.env" });

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

connectDB();

app.use("/user", authRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", OrderRoute);

app.listen(process.env.PORT, () => {
	console.log("let get this party started 🐯");
});
