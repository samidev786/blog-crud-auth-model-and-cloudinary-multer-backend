let mongoose = require('mongoose')

let schema = new mongoose.Schema({
    name:{
        type:String,
        unique:false,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
         type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true,      
        default:"user"
    }
},{
    timestamps:true
})

let userModel = mongoose.model("user",schema)
module.exports = {userModel}