const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./user/routes/userRoutes");
const productRoutes = require("./user/routes/productRoutes");
// const categoryRoutes = require("./user/routes/categoryRoutes");
const addToCartRoutes = require("./user/routes/addToCartRoutes");
const userAddress = require("./user/routes/addressRoutes");
const productOrderRoutes = require("./user/routes/productOrder");
const vendorRoutes = require("./vendor/routes/userRoutes");
const vendorAddProducts = require("./vendor/routes/productRoutes");
const recivedVendororder = require("./vendor/routes/orderRouters");
const admin = require("./admin/routes/userRoutes");
const vendor = require("./admin/routes/vendorDetailsRouter");
const deliveryRoutes = require("./deliveryBoy/routes/usersRoutes");

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
// Home route for admin routes
app.get("/", (req, res) => {
  res.send("API is running successfully");
});
// Routes
app.use("/api/users", userAddress);

app.use("/user", userRoutes);

// Use the product routes
app.use("/api", productRoutes);

// // Use the cart routes
app.use("/api/cart", addToCartRoutes);

app.use("/api/products", productOrderRoutes);

//Vender
app.use("/api/vendor", vendorRoutes);
app.use("/api/vendor", vendorAddProducts);
app.use("/api/vendor", recivedVendororder);
app.use("/api/vendor", vendor);

//admin

app.use("/api/admin", admin);

//deliver boys Users

app.use("/api/deliveryBoys", deliveryRoutes);

// // Home route for admin routes

// // Use the category routes
// app.use("/api/categories", categoryRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
