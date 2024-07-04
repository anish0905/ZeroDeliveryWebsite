const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    orderStatus: { type: String, required: true },
    orderDate: { type: Date, required: true },
    paymentStatus: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    deliveryDate: { type: Date },
    trackingNumber: { type: String },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }]
},{timestamps:true});

module.exports = mongoose.model('OrderHistory', OrderHistorySchema);