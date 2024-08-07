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
      .populate("address"); // Populate address details

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

exports.changeStatus = async (req, res) => {
  const { orderId, newStatus } = req.body;
  try {
    // Fetch the order with the provided ID
    const order = await recivedOrder.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );

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
};

exports.getMonthlyOrderCount = async (req, res) => {
  try {
    const result = await recivedOrder.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          orderCount: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductCount = async (req, res) => {
  try {
    // Count the number of products in the collection
    const productCount = await Product.countDocuments({});

    res.status(200).json({ productCount });
  } catch (error) {
    console.error("Error getting product count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Total product Order

exports.getTotalProductQuantity = async (req, res) => {
  try {
    const result = await recivedOrder.aggregate([
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//weekly weekly product order

exports.getWeeklyProductOrder = async (req, res) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0); // Set time to the start of the day

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // End of the week (Saturday)
    endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day

    const result = await recivedOrder.aggregate([
      {
        $unwind: "$products",
      },
      {
        $match: {
          createdAt: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json(result.length ? result[0] : { totalQuantity: 0 });
  } catch (error) {
    console.error("Error fetching weekly product quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
