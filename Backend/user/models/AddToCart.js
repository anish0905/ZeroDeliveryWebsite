const mongoose = require('mongoose');

// Define the AddToCartItem schema
const addToCartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },

    attributes: {
        size: { type: String },
        color: { type: String }
    }
});

// Define the AddToCart schema
const addToCartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    cartItems: { type: [addToCartItemSchema], required: true },
    timestamp: { type: Date, default: Date.now, required: true },
    promotionCode: { type: String },
    totalPrice: { type: Number, required: true }
});

const AddToCart = mongoose.model('AddToCart', addToCartSchema);

module.exports = AddToCart;
