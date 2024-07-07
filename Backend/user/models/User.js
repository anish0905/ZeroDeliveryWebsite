const mongoose = require("mongoose");



const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  addressType: {
    type: String,
    required: true,
  },
  location: {
    lat: Number,
    lng: Number,
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;


const userSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name:{
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
    addresses: [addressSchema], // Array of addresses
    wallet: {
      type: Number,
      default: 0,
    },
    security: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
