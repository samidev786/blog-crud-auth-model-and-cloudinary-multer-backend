const {userModel} = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
let {sendOtpEmail,sendResetEmail} = require('../services/sendEmail')
let {userValidationSchema} = require('../validator/validateSignup')

exports.signup = async(req,res) => {
try{
let {name,email,password} = req.body;
await userValidationSchema.validate(req.body);//sends to catch if validation fails
password = await bcrypt.hash(password,12)
let otp = Math.floor(Math.random()*100000)
let user = userModel({name,email,password,otp})
await user.save()
await sendOtpEmail(
   'samishaikh12313@gmail.com',
    email,
    otp
)
let token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2h'})
return res.status(200).json({
    success:true,
    data:{...req.body,token}
})

}catch(error){
    console.log(error)
    if(error.errors){
        return res.status(500).json({
        message:"bad request",
        error:error.errors
    })
    }else{
        return res.status(400).json({
        message:"bad request",
        error:error.message
    })
    }
    
}
}

exports.verifyOTP = async(req,res) => {
try{
let token = req.headers.authorization.split(" ")[1];
if(!token) {
    res.status(400).json({
        message:"token not found",
        status:500

    })
}
let {userId} = jwt.verify(token,process.env.JWT_SECRET);
if(!userId) {
    res.status(400).json({
        message:"unauthorize access,invalid token!",
        status:401
    })
}
let {otp} = req.body;
if(!otp) {
    res.status(400).json({message:"bad request, otp not found",status:400})
}
let user = await userModel.findById(userId);
let {otp:savedOtp} = user
if(otp != savedOtp){
     res.status(400).json({
        message:"incorrect otp",
        status:400
    })
}
user.isVerify = true
user.save()
return res.status(200).json({
    message:"otp correct!"
})

}
catch(err){
return res.status(500).json({
    message:err.message,
    status:500
})
}
}

exports.login = async (req,res) => {
    try{
     let {email,password} = req.body
     if(!email || !password){
     throw new Error(JSON.stringify({message:"bad request,email or password not found",status:400}))
     }
     let user = await userModel.findOne({email})
     if(!user){
     return res.status(404).json({
        message:"user not found",
        status:404,
    })

     }
    if(!user.isVerify){
        let otp = Math.floor(Math.random()*100000)
        user.otp = otp;
        user.save();
     let token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2h'})
     await sendOtpEmail("samishaikh12313@gmail.com",email,otp)
     return res.status(401).json({
        message:"user is not verified!.Email sent with otp to verify user",
        status:401,
        token
    })
     }
     let compare = await bcrypt.compare(password,user.password)
     if(!compare){
     return res.status(401).json({
        message:"invalid credentials",
        status:401})
     }
    let token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2h'})
     return res.status(200).json({
        message:"login success!",
        status:200,
        data:{...user._doc,token}
     })
    }catch(err){
      return res.status(500).json({
        message:"login failed error occurred!"
      })
    }
}

exports.forgotPassword = async(req,res) => {
try{
let {email} = req.body;
if(!email){
    return res.status(400).json({
        message:"bad request"
    })
}
let user = await userModel.findOne({email})
if(!user){
    return res.status(400).json({
        message:"invalid email"
    })
}
let token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
await sendResetEmail("samishaikh12313@gmail.com",email,token);
 return res.status(200).json({
        message:`password reset email sent on your ${email}!`,
    })
}catch(err){
    return res.status(400).json({
        message:"failed to reset!",
        error:err.message
    })
}
}

exports.resetPassword = async (req,res) => {
try{
let token = req.headers.authorization.split(" ")[1];
if(!token){
    return res.status(401).json({
        message:"token not found"
    })
}
let {userId} = jwt.verify(token,process.env.JWT_SECRET)
if(!userId){
    return res.status(400).json({
        message:"invalid token,user id not found"
    })
}
let {password} = req.body;
password = await bcrypt.hash(password,12)
await userModel.findByIdAndUpdate({_id:userId},{password});
return res.status(200).json({
    message:"password updated successfully!"
})
}catch(err){
    return res.status(500).json({
        message:"failed to reset password!"
    })
}
}

