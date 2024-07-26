const express = require("express");
const router = express.Router();
const order = require("../controller/orderController");


router.get("/placeOrder/:userId", order.getOrders);


module.exports = router;
