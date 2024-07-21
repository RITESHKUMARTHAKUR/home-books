const crypto = require('crypto');
const otpModel =  require('../../models/Otp');
const sendOtpEmail = require('../../middleware/sendOtp_email');

function generateOtp() {
    const otp = crypto.randomInt(100000,1000000)
    return otp;
}

const otpMail = async (req,res) => {
    const {userEmail} = req.body;
    const mailOtp = generateOtp();

    const mailoptions = {
        userEmail,
        mailOtp
    }

    try {
            const otpDoc = await otpModel.create({
                userEmail,
                otp: mailOtp
            });
            await sendOtpEmail(mailoptions);

            res.status(200).json({"msg": "OTP sent successfully!!"})
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports = otpMail;