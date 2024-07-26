 const recivedOrder = require("../../user/models/productOrderSchema");
const user = require("../../user/models/User");
const product = require("../../user/models/Product");
const mongoose = require("mongoose");




exports.getOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        // Ensure userId is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Find all orders and populate necessary fields
        const orders = await recivedOrder.find()
        .populate('product.productId')
        .populate('address');

        // Filter orders where at least one product's User matches the provided userId
        console.log(orders);
        const filteredOrders = orders.filter(order => 
            order.products.some(product => 
                product.User && product.User.toString() === userId
            )
        );

        if (filteredOrders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this user' });
        }

        // Format the orders if needed
        const formattedOrders = filteredOrders.map(order => {
            return {
                ...order.toObject(),
                products: order.products.map(product => ({
                    ...product.toObject(),
                    product: product.productId // Use populated productId details
                }))
            };
        });

        res.status(200).json({ success: true, data: formattedOrders });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};




