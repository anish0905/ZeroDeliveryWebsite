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
        // Add the fields you need from the Product schema
      })
      .populate("address") // Populate address details
    
 // Fetch addresses for each order
 const ordersWithAddresses = await Promise.all(
    orders.map(async (order) => {
      const user = await User.findById(order.userId).select("addresses");
      const address = user.addresses.id(order.address);
      return { ...order.toObject(), address };
    })
  );

  if (!ordersWithAddresses.length) {
    return res
      .status(404)
      .json({ message: "No orders found for this user." });
  }

  res.status(200).json(ordersWithAddresses);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server error. Please try again later." });
}
};



exports.changeStatus = async(req,res)=>{
    const { orderId, newStatus } = req.body;
    try {
        // Fetch the order with the provided ID
        const order = await recivedOrder.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
        
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
        
        // Fetch the updated order
        const updatedOrder = await recivedOrder.findById(orderId);
        
        res.status(200).json(updatedOrder);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
        
    }

}