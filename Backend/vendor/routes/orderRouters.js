const express = require("express");
const router = express.Router();
const order = require("../controller/orderController");

router.get("/placeOrder/:vendorUserId", order.getOrdersByVendorUser);

router.put("/changeOrderStatus", order.changeStatus);

module.exports = router;
