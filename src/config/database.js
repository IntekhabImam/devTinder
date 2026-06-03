const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://devTinder:Intekhab@divtinder.paqawpx.mongodb.net/divTinder");
};


module.exports = connectDB;