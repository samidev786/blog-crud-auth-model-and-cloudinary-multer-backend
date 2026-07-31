const express = require('express')
const authRouter = express.Router();
const {signup, verifyOTP, login, forgotPassword, resetPassword} = require('../controllers/authController')

authRouter.post("/signup",signup)
authRouter.post("/verify-otp",verifyOTP)
authRouter.post("/login",login)
authRouter.post("/forgot-password",forgotPassword)
authRouter.post("/reset-password",resetPassword)

module.exports = { authRouter }