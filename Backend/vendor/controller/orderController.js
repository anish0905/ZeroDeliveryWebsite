const recivedOrder = require("../../user/models/productOrderSchema");
const User = require("../../user/models/User");
const Product = require("../../user/models/Product");

const mongoose = require("mongoose");

exports.getOrdersByVendorUser = async (req, res) => {
  const { vendorUserId } = req.params;

  try {
    // Ensure vendorUserId is provided
    if (!vendorUserId) {
      return res.status(400).json({ message: "Vendor User ID is required." });
    }

    // Check if vendorUserId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(vendorUserId)) {
      return res
        .status(400)
        .json({ message: "Invalid Vendor User ID format." });
    }

    // Fetch all orders where VendorUser matches the provided ID
    const orders = await recivedOrder
      .find({ VendorUser: vendorUserId })
      .populate({
        path: "products.productId",
        select: "name price image", // Add the fields you need from the Product schema
      })
      .populate("address") // Populate address details
      .exec();

    // Fetch addresses for each order
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findById(order.userId).select("addresses");
        const address = user.addresses.id(order.address);
        return {
          ...order.toObject(),
          address,
          products: order.products.map((product) => ({
            ...product.toObject(),
            image: product.productId.image, // Include image in the product details
          })),
        };
      })
    );

    if (!ordersWithDetails.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this vendor." });
    }

    res.status(200).json(ordersWithDetails);
  } catch (error) {
    console.error("Error in getOrdersByVendorUser:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
