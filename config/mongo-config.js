let mongoose = require('mongoose');

exports.connectMongo = () => {
mongoose.connect(process.env.MONGO_URL)
let db = mongoose.connection
db.once("open",()=>{
    console.log("mongo connected")
})
db.on("error",()=>{
    console.log("mongo error")
})
}