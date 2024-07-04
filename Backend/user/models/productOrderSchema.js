const mongoose = require("mongoose");

const prosuctOrderSchema = new  mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
    orderDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    paymentMethod: { type: String, required: true },
    paymentStatus:{ type: String, required: true,
        enum: ['paid', 'unpaid']
     },


    trackingNumber: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    customerName: { type: String, required: true },
    

},{timestamps:true})


module.exports = mongoose.model("ProductOrder", prosuctOrderSchema);
