// controllers/productController.js
const Product = require("../../user/models/Product"); // Adjust the path as necessary

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send({
      message: "Product added successfully!",
      product,
    });
  } catch (error) {
    res.status(400).send({
      message: "Product validation failed: " + error.message,
    });
  }
};

// Get all products or filter by query parameters
exports.getProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ VendorUser: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Group products by category
exports.groupProductsByCategory = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $group: { _id: "$category", products: { $push: "$$ROOT" } } },
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Group products by brand
exports.groupProductsByBrand = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $group: { _id: "$brand", products: { $push: "$$ROOT" } } },
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get products by brand
exports.getProductsByBrand = async (req, res) => {
  try {
    const products = await Product.find({ brand: req.params.brand });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search products by title
exports.searchProductsByTitle = async (req, res) => {
  try {
    const products = await Product.find({
      title: new RegExp(req.params.title, "i"),
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all brands
exports.getBrand = async (req, res) => {
  try {
    const brands = await Product.distinct("brand");
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
