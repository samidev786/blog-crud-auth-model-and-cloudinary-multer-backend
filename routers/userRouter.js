let express = require('express');
const { authMiddleware, allowOnlyUser, allowOnlyAdmin } = require('../middleware/authMiddleware');
let userRouter = express.Router();
const { getProfile } = require('../controllers/userController')

userRouter.get("/profile",authMiddleware,allowOnlyUser,getProfile)


module.exports = {userRouter};