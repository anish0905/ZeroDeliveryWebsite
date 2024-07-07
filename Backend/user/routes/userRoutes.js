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
  loginUser,
  verifyUser,
  getUserById,
  addUserName
} = require("../controllers/userController");

const router = express.Router();

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
// location
router.post("/update-location", updateLocation);
router.get("/get-location", getLocation);

//address

router.post("/update-address", updateAddress);
router.get("/get-address/:userId", getAddress);

//wallet

router.post("/add-balance", addBalance);
router.get("/get-balance", getBalance);

// Define routes
router.get("/account-security", checkSecurity);
router.delete("/delete-user", deleteUser);

router.post("/login",loginUser )

router.post("/vefifyOpt",verifyUser)

router.get("/getGetUser/:userId",getUserById)

router.post("/addname/:userId",addUserName)


module.exports = router;
