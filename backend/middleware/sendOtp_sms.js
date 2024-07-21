const crypto = require('crypto')    
const twilio = require('twilio')  
import OtpModel from "../models/Otp"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authtoken = process.env.TWILIO_AUTH_TOKEN


function generateOtp() {
    const otp = crypto.randomInt(1000000,10000000)
    return otp;
}


const sendOtp = async (userData) => {
    const { userEmail } = userData;

}




