let nodeMailer = require('nodemailer');
require('dotenv').config();

let transporter = nodeMailer.createTransport({
    service:"gmail",
    //auth verifies that we are using the service legitimately or not
    //it checks the app password inside our email
    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_APP_PASSWORD
    },
})

exports.sendOtpEmail = async(sender,reciever,otp) => {
transporter.sendMail({
    from:sender,
    to:reciever,
    html:`
    <h1>your otp is ${otp}</h1>
    `
})
}

exports.sendResetEmail = async(sender,reciever,token) => {
transporter.sendMail({
    from:sender,
    to:reciever,
    html:`
    <a href='https://localhost:1000/resetPassword/${token}' target='_blank'>Reset password</a>
    `
})
}