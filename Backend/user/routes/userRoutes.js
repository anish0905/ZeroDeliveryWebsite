const express = require("express");
const {
  requestOtp,
  verifyOtp,
  updateLocation,
  getLocation,
  updateAddress,
  getAddress,
  addBalance,
  getBalance,
  checkSecurity,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
// location
router.post("/update-location", updateLocation);
router.get("/get-location", getLocation);

//address

router.post("/update-address", updateAddress);
router.get("/get-address", getAddress);

//wallet

router.post("/add-balance", addBalance);
router.get("/get-balance", getBalance);

// Define routes
router.get("/account-security", checkSecurity);
router.delete("/delete-user", deleteUser);

module.exports = router;
