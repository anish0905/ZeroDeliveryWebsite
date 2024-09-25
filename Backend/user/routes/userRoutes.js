const express = require("express");
const {
  updateLocation,
  getLocation,
  updateAddress,
  getAddress,
  addBalance,
  getBalance,
  deleteUser,
  verifyUser,
  getUserById,
  addUserName,
  login,
} = require("../controllers/userController");

const router = express.Router();

// OTP request and verification
router.post("/request-otp", login);
router.post("/verify-otp", verifyUser);

// Location routes
router.post("/update-location", updateLocation);
router.get("/get-location", getLocation);

// Address routes
router.post("/update-address", updateAddress);
router.get("/get-address/:userId", getAddress);

// Balance routes
router.post("/add-balance", addBalance);
router.get("/get-balance", getBalance);

// User management
router.delete("/delete-user", deleteUser);
router.get("/user/:userId", getUserById); // Fetch user by ID
router.put("/user/:userId/name", addUserName); // Update user name

module.exports = router;
