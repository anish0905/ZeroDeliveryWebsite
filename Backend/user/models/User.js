const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
   
    unique: true,
    trim: true,
    match: /^\+\d{1,15}$/,
    unique: true,
    trim: true,
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
  accountPrivacy: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
