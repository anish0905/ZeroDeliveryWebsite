const mongoose = require('mongoose');

// Define the Address schema
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    addressType: { type: String, required: true },
    location: {
        lat: Number,
        lng: Number
    }
});

// Define the Cart Item schema
const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discountPercentage:{ type: Number},
    attributes: {
        size: { type: String },
        color: { type: String }
    }
});

// Define the User schema
const userSchema = new mongoose.Schema({
    
        mobileNumber: {
          type: String,
          required: true,
          unique: true,
        },
        name: {
          type: String,
        },
        otp: {
          type: String,
        },
        otpExpires: {
          type: Date,
        },
        location: {
          type: String,
        },
        addresses: [addressSchema],
        cart: [cartItemSchema] , // Array of addresses
        wallet: {
          type: Number,
          default: 0,
        },
        security: {
          type: Boolean,
          default: true,
        },
      }, 
   
);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
