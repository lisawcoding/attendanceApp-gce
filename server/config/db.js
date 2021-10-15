const mongoose = require("mongoose");

const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv")
// var cors = require("cors");

const app = express();

dotenv.config()
// const db="mongodb+srv://lisa:yD3nbWsCUe0zt3XM@cluster0.p5rms.mongodb.net/employees?retryWrites=true&w=majority";
const db=process.env.MONGODB

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