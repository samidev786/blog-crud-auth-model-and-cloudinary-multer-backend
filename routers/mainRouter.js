const express = require('express')
const mainRouter = express.Router();
const { authRouter } = require('./authRouter')
const { userRouter } = require('./userRouter');
const { blogRouter } = require('./blogRouter');
const { authMiddleware, allowOnlyUser } = require('../middleware/authMiddleware');

mainRouter.use("/auth",authRouter)
mainRouter.use("/user",userRouter)
mainRouter.use("/blog",authMiddleware,allowOnlyUser,blogRouter)
module.exports = {mainRouter}