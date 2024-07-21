const nodemailer = require('nodemailer');

const sendOtpEmail = async (options) => {
    
    let config = {
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    };

    let message = {
        from: process.env.ADMIN_EMAIL, // sender address
        to: options.userEmail, // list of receivers
        subject: "Delivery OTP", // Subject line
        html: `<p>Your Delivery OTP is <b>${options.mailOtp}</b>, <br><br> Share this OTP with delivery persson to complete your order</p>`, // html body
    }

    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(message);

}


module.exports = sendOtpEmail;