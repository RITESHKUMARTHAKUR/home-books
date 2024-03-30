const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    productDetails: {
        type: Object
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userContact: {
        type: Number
    },
    productQuantity: {
        type: Number
    }

}, {
    timestamps: true,
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;