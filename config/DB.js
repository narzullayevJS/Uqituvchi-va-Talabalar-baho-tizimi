const mongoose = require("mongoose")

const connectDB = async(req,res)=>{
try {
    const connect = await mongoose.connect(process.env.URL)
    console.log("MongoDb connected");
} catch (error) {
    console.log("MongoDB connected error", error.message);
}
}

module.exports = connectDB