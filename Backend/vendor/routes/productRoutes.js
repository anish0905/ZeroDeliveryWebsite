// routes/productRoutes.js
const express = require("express");
const productController = require("../controller/productController");
const validateToken = require("../../middleware/validateTokenHandler");
const router = express.Router();

// Define routes
router.post("/products", validateToken, productController.createProduct);
router.get("/products/:id", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", validateToken, productController.updateProductById);
router.delete(
  "/products/:id",
  validateToken,
  productController.deleteProductById
);

// Define the route to fetch products by category

// Define the route to all category
router.get("/prod/category", productController.groupProductsByCategory);

// Define the route to Brand products
router.get("/prod/brand", productController.groupProductsByBrand);

//  Define the route to category by products
router.get("/prod/category/:category", productController.getProductsByCategory);

// Define the route to Brand by products
router.get("/prod/brand/:brand", productController.getProductsByBrand);

// Route to search products by title
router.get("/products/search/:title", productController.searchProductsByTitle);
// Route to fetch categories
router.get("/categories", productController.getCategories);

// Route to fetch brands
router.get("/product/brands", productController.getBrand);



module.exports = router;
