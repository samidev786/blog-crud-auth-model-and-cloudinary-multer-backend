let {userModel} = require('../models/user')

exports.getProfile = async(req,res) => {
const {userId:id} = req;
if(!id){
    return res.status(400).json({
        message:"id not found"
    })
}
let user = await userModel.findById(id).select('-password -token');;
if(!user){
    return res.status(404).json({
        message:"user not found"
    })
}
return res.status(200).json({
    message:"user data returned successfully!",
    data:user
})
}