// controllers/productController.js
const Product = require("../../user/models/Product"); // Adjust the path as necessary
const upload = require("../../modules/fileModule");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const { log } = require("console");

// Create a new product
exports.createProduct = async (req, res) => {
  upload.fields([{ name: "images", maxCount: 10 }, { name: "thumbnail", maxCount: 1 }])(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "An unknown error occurred." });
    }

    // Extract image URLs from the uploaded files
    const images = req.files["images"] ? req.files["images"].map(file => file.path) : [];
    const thumbnail = req.files["thumbnail"] ? req.files["thumbnail"][0].path : "";

    // Parse the dimensions from a string to an object
    let dimensions;
    try {
      dimensions = JSON.parse(req.body.dimensions);
    } catch (error) {
      return res.status(400).json({ error: "Invalid dimensions format. Please provide valid JSON." });
    }

    // Create a new product
    const productData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      stock: req.body.stock,
      tags: req.body.tags.split(","), // Assuming tags are sent as a comma-separated string
      brand: req.body.brand,
      sku: req.body.sku,
      weight: req.body.weight,
      dimensions: dimensions, // Properly parsed dimensions object
      warrantyInformation: req.body.warrantyInformation,
      shippingInformation: req.body.shippingInformation,
      availabilityStatus: req.body.availabilityStatus,
      returnPolicy: req.body.returnPolicy,
      minimumOrderQuantity: req.body.minimumOrderQuantity,
      images: images,
      thumbnail: thumbnail,
      VendorUser: req.body.VendorUser,
    };

    try {
      const product = new Product(productData);
      await product.save();
      res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      console.error("Error saving product data to the database:", error);
      res.status(500).json({ error: "Error saving product data to the database." });
    }
  });
};


exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).send("Error retrieving files from the database.");
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
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    
    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image files
    const deleteFile = (filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', filePath, err);
        }
      });
    };

    // Deleting images in the `images` array
    if (Array.isArray(product.images)) {
      product.images.forEach(image => {
        const imagePath = path.join(__dirname, '../../', image);
        deleteFile(imagePath);
      });
    }

    // Deleting the thumbnail
    if (product.thumbnail) {
      const thumbnailPath = path.join(__dirname, '../../', product.thumbnail);
      deleteFile(thumbnailPath);
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product and associated images deleted successfully" });

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

// Ensure luxon is installed: npm install luxon



