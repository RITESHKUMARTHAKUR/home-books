const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userAddress: String,
    userContact: Number,
    userId: String,
    orderTotal: Number,
    itemsCount: Number,
    orderProducts: Array,
    
    orderStatus: Number
}, {
    timestamps: true,
});


const orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel;