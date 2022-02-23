const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config()
const dotenv = require("dotenv").config({path:__dirname+'/./../../.env'});

const db=process.env.MONGODB;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB is Conntected");
    } catch(err) {
        console.log("connectDB ERR: ", err)
    }
}

module.exports = connectDB;