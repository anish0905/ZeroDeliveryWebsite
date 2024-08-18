const Banner = require("../models/banner");
const upload = require("../../modules/fileModule");
const multer = require("multer");
// Create a new banner
exports.createBanner = async (req, res,next) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    // Save file metadata to the database
    const fileData = new Banner({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    try {
      await fileData.save();
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      res.json({ message: "Upload successful", file: req.file, url: fileUrl });
    } catch (error) {
      res.status(500).send("Error saving file data to the database.");
    }
  });
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
  