// models/productSchema.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the product title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add the product description"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add the product category"],
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add the product price"],
      min: [0, "Price cannot be less than 0"],
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: [0, "Discount percentage cannot be less than 0"],
      max: [100, "Discount percentage cannot be more than 100"],
    },
    finalPrice: {
      type: Number,
      required: [true, "Please add the final price after discount"],
      min: [0, "Final price cannot be less than 0"],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    stock: {
      type: Number,
      required: [true, "Please add the stock quantity"],
      min: [0, "Stock cannot be less than 0"],
    },
    brand: {
      type: String,
      required: [true, "Please add the product brand"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "Please add the product SKU"],
      unique: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: [true, "Please add the product weight"],
      min: [0, "Weight cannot be less than 0"],
    },
    dimensions: {
      width: {
        type: Number,
        required: [true, "Please add the product width"],
        min: [0, "Width cannot be less than 0"],
      },
      height: {
        type: Number,
        required: [true, "Please add the product height"],
        min: [0, "Height cannot be less than 0"],
      },
      depth: {
        type: Number,
        required: [true, "Please add the product depth"],
        min: [0, "Depth cannot be less than 0"],
      },
    },
    warrantyInformation: {
      type: String,
      default: "No warranty information available",
    },
    shippingInformation: {
      type: String,
      default: "Ships in 1-2 business days",
    },
    availabilityStatus: {
      type: String,
      default: "In Stock",
      enum: ["In Stock", "Out of Stock", "Low Stock", "Preorder"],
    },
    returnPolicy: {
      type: String,
      default: "30 days return policy",
    },
    minimumOrderQuantity: {
      type: Number,
      default: 1,
      min: [1, "Minimum order quantity cannot be less than 1"],
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Please add at least one tag",
      },
    },
    reviews: [
      {
        rating: {
          type: Number,
          required: true,
          min: [0, "Rating cannot be less than 0"],
          max: [5, "Rating cannot be more than 5"],
        },
        comment: {
          type: String,
          trim: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        reviewerName: {
          type: String,
          trim: true,
        },
        reviewerEmail: {
          type: String,
          trim: true,
        },
      },
    ],
    meta: {
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      barcode: {
        type: String,
        trim: true,
      },
      qrCode: {
        type: String,
        trim: true,
      },
    },
    thumbnail: {
      type: String,
      default: "default-thumbnail-url",
      trim: true,
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Please add at least one image URL",
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    expirationDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
