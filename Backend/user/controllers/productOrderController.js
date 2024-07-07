const ProductOrder = require("../models/productOrderSchema");
const mongoose = require("mongoose");

const productOrder = async (req, res) => {
    const { userId, products, address, paymentMethod, paymentStatus } = req.body;

    try {
        if (!userId || !products || !address || !paymentMethod || !paymentStatus) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProductOrder = new ProductOrder({
            userId,
            products,
            address,
            paymentMethod,
            paymentStatus,
            status: "pending"
        });

        await newProductOrder.save();
        res.status(201).json({ message: "Product order created successfully", newProductOrder });

    } catch (error) {
        res.status(500).json({ message: "Error creating product order", error });
    }
}

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
    cancelledOrder  
};
