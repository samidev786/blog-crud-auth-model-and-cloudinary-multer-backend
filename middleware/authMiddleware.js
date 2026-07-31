const {userModel} = require('../models/user')
let jwt = require('jsonwebtoken')

exports.authMiddleware = async(req,res,next) =>{
try{
let token = req.headers.authorization?.split(" ")[1];
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
const user =await userModel.findById(userId)
let userPayload = {
    role:user.role,
    id:user._id,
}
req.user = userPayload;
next();
}catch(err){
    return res.status(400).json({
        message:"Internal server error!...",
        error:err.message
    })
}
}

exports.allowOnlyAdmin = async (req,res,next) =>{
if(!req.user){
    return res.status(404).json({
        message:"user not found!"
    })
}
if(req.user.role !== "admin"){
    return res.status(401).json({
        message:"Unauthorize access, Access denied!"
    })
}
next()
}

exports.allowOnlyUser = async (req,res,next) =>{ss
if(!req.user){
    return res.status(404).json({
        message:"user not found!"
    })
}
if(req.user.role !== "user"){
    return res.status(401).json({
        message:"Unauthorize access, Access denied!"
    })
}
next();
} 
