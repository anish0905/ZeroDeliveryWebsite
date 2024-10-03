const mongoose = require("mongoose");

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
    lng: Number,
  },
});

// Define the Cart Item schema
const cartItemSchema = new mongoose.Schema({
  VendorUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorUser",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  attributes: {
    size: { type: String },
    color: { type: String },
  },
  Image: {
    type: String,
  },
});

// Define the User schema
const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
  },
  email: {
    type: String,
    
    sparse: true, // Allows multiple documents without email
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
  cart: [cartItemSchema], // Array of addresses
  wallet: {
    type: Number,
    default: 0,
  },
  security: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.generateOtp = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  this.otp = otp;
  this.otpExpires = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
  return otp;
};

// Method to verify OTP
userSchema.methods.verifyOtp = function (inputOtp) {
  if (this.otp === inputOtp && this.otpExpires > Date.now()) {
    this.isVerified = true;
    this.otp = undefined; // Clear OTP after successful verification
    this.otpExpires = undefined;
    return true;
  }
  return false;
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
