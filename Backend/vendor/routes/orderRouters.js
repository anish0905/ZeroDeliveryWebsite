const express = require("express");
const router = express.Router();
const order = require("../controller/orderController");

router.get("/placeOrder/:vendorUserId", order.getOrdersByVendorUser);

router.put("/changeOrderStatus", order.changeStatus);
router.get(
  "/products/lastThirtyDays/:vendorId",
  order.getProductsLastThirtyDays
);
router.get("/products/lastSevenDays/:vendorId", order.getProductsLastSevenDays);
router.get("/totalorder/monthwise/:vendorId", order.getMonthlyOrderCount);

module.exports = router;
