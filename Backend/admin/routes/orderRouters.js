const express = require("express");
const router = express.Router();
const order = require("../controller/orderController");

router.get("/placeOrder/:vendorUserId", order.getOrdersByVendorUser);

router.put("/changeOrderStatus", order.changeStatus);

router.get("/products/totalorder/monthwise", order.getMonthlyOrderCount);

router.get("/products/totalorder", order.getTotalProductQuantity);
router.get("/products/addkiyahua/TotalProducts", order.getProductCount);
router.get(
  "/products/addkiyahua/TotalWeeklyProducts",
  order.getWeeklyProductOrder
);

module.exports = router;
