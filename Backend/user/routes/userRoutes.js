const express = require('express');
const { requestOtp, verifyOtp,updateLocation, getLocation } = require('../controllers/userController');

const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
// location
router.post('/update-location', updateLocation);
router.get('/get-location', getLocation);

//address


module.exports = router;
