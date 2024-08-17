const mongoose = require("mongoose");

// Sub-schema for Reviews
const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

// Sub-schema for Metadata
const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String },
  qrCode: { type: String },
});

// Sub-schema for Dimensions
const dimensionsSchema = new mongoose.Schema({
  width: { type: String },
  height: { type: String },
  depth: { type: String },
});

// Main Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  tags: { type: [String], required: true },
  brand: { type: String },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  dimensions: { type: dimensionsSchema },
  warrantyInformation: { type: String },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  reviews: { type: [reviewSchema] },
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  meta: { type: metaSchema, default: () => ({}) },
  images: { type: [String], required: false }, // Array of image URLs
  thumbnail: { type: String, required: false }, // Single thumbnail image URL
  VendorUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorUser",
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
