// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  name:{
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 255,
  },
  pincode:{
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },


  isVerified: { type: Boolean, default: false },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.generateOtp = function () {
  this.otp = crypto.randomBytes(3).toString("hex");
  this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
};

userSchema.pre("validate", function (next) {
  if (!this.otp || !this.otpExpires) {
    this.generateOtp();
  }
  next();
});


userSchema.methods.generateOtp = function () {
  this.otp = crypto.randomBytes(3).toString("hex");
  this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const VendorUser = mongoose.model("VendorUser", userSchema);
module.exports = VendorUser;
