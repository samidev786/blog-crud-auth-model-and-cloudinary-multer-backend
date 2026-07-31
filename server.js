const express = require('express')
const app = express();
const port = 8000;
const {mainRouter} = require('./routers/mainRouter')
const {connectMongo} = require('./config/mongo-config')
require('dotenv').config()

const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use("/",mainRouter)
connectMongo();
app.listen(port,()=>{
console.log(`backend running on port ${port}`);
})