const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
},{
    timestamps: true,
});

const otpModel = mongoose.model("userOtp",otpSchema);

module.exports = otpModel;