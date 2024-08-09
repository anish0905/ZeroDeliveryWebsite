const Banner = require("../models/banner");
// Create a new banner
exports.createBanner = async (req, res) => {
    try {
      const { images } = req.body;
  
      // Create a new banner instance
      const newBanner = new Banner({
        images,
      });
  
      // Save the banner to the database
      const savedBanner = await newBanner.save();
  
      res.status(201).json({
        message: 'Banner created successfully',
        banner: savedBanner,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating banner',
        error: error.message,
      });
    }
  };
  
  // Get all banners
  exports.getBanners = async (req, res) => {
    try {
      const banners = await Banner.find();
      res.status(200).json(banners);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching banners',
        error: error.message,
      });
    }
  };
  
  // Get a banner by ID
  exports.getBannerById = async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({
          message: 'Banner not found',
        });
      }
      res.status(200).json(banner);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching banner',
        error: error.message,
      });
    }
  };
  
  // Update a banner by ID
  exports.updateBanner = async (req, res) => {
    try {
      const { images } = req.body;
  
      // Find the banner by ID and update
      const updatedBanner = await Banner.findByIdAndUpdate(
        req.params.id,
        { images },
        { new: true, runValidators: true } // Return the updated banner
      );
  
      if (!updatedBanner) {
        return res.status(404).json({
          message: 'Banner not found',
        });
      }
  
      res.status(200).json({
        message: 'Banner updated successfully',
        banner: updatedBanner,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating banner',
        error: error.message,
      });
    }
  };
  
  // Delete a banner by ID
  exports.deleteBanner = async (req, res) => {
    try {
      const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
  
      if (!deletedBanner) {
        return res.status(404).json({
          message: 'Banner not found',
        });
      }
  
      res.status(200).json({
        message: 'Banner deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting banner',
        error: error.message,
      });
    }
  };
  