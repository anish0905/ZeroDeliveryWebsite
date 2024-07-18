const ProductOrder = require("../models/productOrderSchema");
const Product = require("../models/Product")
const mongoose = require("mongoose");
const User = require('../models/User');

const productOrder = async (req, res) => {
  try {
    const { userId, products, address, paymentMethod } = req.body;

    // Validate the required fields
    if (!userId || !products || !address || !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate productIds in products array
    const isValidProductIds = products.every(product => mongoose.Types.ObjectId.isValid(product.productId));

    if (!isValidProductIds) {
      return res.status(400).json({ message: 'Invalid productId format.' });
    }

    // Create a new product order
    const newOrder = new ProductOrder({
      userId,
      products,
      address,
      paymentMethod,
      paymentStatus: 'unpaid',
      status: 'pending'
    });

    // Save the product order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
  // Fetch product orders by user ID
  const getProductOrdersByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Validate the user ID
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
  
      // Check if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
      }
  
      // Find product orders by user ID
      const orders = await ProductOrder.find({ userId:new mongoose.Types.ObjectId(userId) })
        .populate('products.productId')
        .populate('address');
  
      // Fetch addresses for each order
      const ordersWithAddresses = await Promise.all(orders.map(async order => {
        const user = await User.findById(order.userId).select('addresses');
        const address = user.addresses.id(order.address);
        return { ...order.toObject(), address };
      }));
  
      if (!ordersWithAddresses.length) {
        return res.status(404).json({ message: 'No orders found for this user.' });
      }
  
      res.status(200).json(ordersWithAddresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };


const cancelledOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        if (!orderId) {
            return res.status(400).json({ message: "orderId is required" });
        }

        const cancelledOrder = await ProductOrder.findByIdAndUpdate(
            orderId,
            { status: "cancelled" },
            { new: true }
        );

        if (!cancelledOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order cancelled successfully", cancelledOrder });

    } catch (error) {
        res.status(500).json({ message: "Error cancelling order", error });
    }
}

module.exports = {
    productOrder,
    cancelledOrder,
    getProductOrdersByUserId 
};
