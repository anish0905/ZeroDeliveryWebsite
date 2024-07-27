const express = require("express");
const router = express.Router();
const order = require("../controller/orderController");

router.get("/placeOrder/:vendorUserId", order.getOrdersByVendorUser);

module.exports = router;
