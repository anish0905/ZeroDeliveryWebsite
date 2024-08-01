const express = require("express");
const router = express.Router();
const vendorDetails = require("../controller/vendorDetailsController");

router.get("/vendor-details", vendorDetails.getVendorsDetails);

module.exports = router;