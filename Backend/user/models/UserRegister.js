const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true, // Allows multiple documents without email
      },
    username: { type: String },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('Userreg', userSchema);

module.exports = User;
