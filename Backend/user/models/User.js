const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
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
    address: {
      type: String,

      trim: true,
      lowercase: true,
      minlength: 10,
      maxlength: 100,
    },
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
