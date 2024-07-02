// controllers/productController.js
const Product = require("../models/Product");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products or filter by query parameters
exports.getProducts = async (req, res) => {
  try {
    const query = req.query || {};
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single product by ID
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

exports.groupProductsByCategory = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category", // Group by the category field
          products: { $push: "$$ROOT" }, // Collect all products in the group
          totalProducts: { $sum: 1 }, // Count the number of products in each category
          totalStock: { $sum: "$stock" }, // Sum the stock for each category
          averagePrice: { $avg: "$price" }, // Calculate the average price for each category
          averageRating: { $avg: "$rating" }, // Calculate the average rating for each category
        },
      },
      {
        $sort: { _id: 1 }, // Sort categories alphabetically
      },
    ]);

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Fetch products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.groupProductsByBrand = async (req, res, next) => {
  try {
    const brands = await Product.aggregate([
      {
        $group: {
          _id: "$brand", // Group by the brand field
          products: { $push: "$$ROOT" }, // Collect all products in the group
          totalProducts: { $sum: 1 }, // Count the number of products in each brand
          totalStock: { $sum: "$stock" }, // Sum the stock for each brand
          averagePrice: { $avg: "$price" }, // Calculate the average price for each brand
          averageRating: { $avg: "$rating" }, // Calculate the average rating for each brand
        },
      },
      {
        $sort: { _id: 1 }, // Sort brands alphabetically
      },
    ]);

    // Send the response back to the client
    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Fetch products by brand

exports.getProductsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const products = await Product.find({ brand });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// search for products based title

exports.searchProductsByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    // Use regex to find products matching the title
    const products = await Product.find({
      title: { $regex: title, $options: "i" }, // 'i' makes it case-insensitive
    }).lean(); // Convert Mongoose documents to plain JavaScript objects

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found with the specified title",
      });
    }

    // Prepare a structured response
    const response = products.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory,
      price: product.price,
      discountPercentage: product.discountPercentage,
      finalPrice: product.finalPrice,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      sku: product.sku,
      weight: product.weight,
      dimensions: product.dimensions,
      warrantyInformation: product.warrantyInformation,
      shippingInformation: product.shippingInformation,
      availabilityStatus: product.availabilityStatus,
      returnPolicy: product.returnPolicy,
      minimumOrderQuantity: product.minimumOrderQuantity,
      tags: product.tags,
      reviews: product.reviews,
      meta: product.meta,
      thumbnail: product.thumbnail,
      images: product.images,
      isAvailable: product.isAvailable,
      expirationDate: product.expirationDate,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
