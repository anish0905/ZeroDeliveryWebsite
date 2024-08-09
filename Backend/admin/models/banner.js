

const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  images: [{ type: String, required: true }], // Array of image URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Banner', bannerSchema);
