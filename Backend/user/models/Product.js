const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
    reviewerName: { type: String, required: true },
    reviewerEmail: { type: String, required: true }
});

const metaSchema = new mongoose.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    barcode: { type: String, required: true },
    qrCode: { type: String, required: true }
});

const dimensionsSchema = new mongoose.Schema({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
    // id: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: { type: [String], required: true },
    brand: { type: String, required: true },
    sku: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: { type: dimensionsSchema, required: true },
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    reviews: { type: [reviewSchema], required: true },
    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, required: true },
    meta: { type: metaSchema, required: true },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
