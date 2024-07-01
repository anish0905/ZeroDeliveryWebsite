const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./user/routes/userRoutes");
const productRoutes = require("./user/routes/productRoutes");
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
// Home route for admin routes
app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/user", userRoutes);

// Use the product routes
app.use("/api", productRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
