const otpModel = require('../../models/Otp');

const verifyOtp = async (req,res) => {
    const {userEmail,otp} = req.body;
    try {
        const otpDoc = await otpModel.findOneAndDelete({userEmail,otp});
        if(otpDoc){
            res.status(200).json({"msg": "OTP verified!"});
        }else {
            res.status(401).json({"msg": "OTP not found!"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = verifyOtp;