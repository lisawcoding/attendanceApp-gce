const express = require("express");
// const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv")
// var cors = require("cors");
const jwt=require("jsonwebtoken");

const app = express();
connectDB();
dotenv.config()
// app.use(cors({
//     origin: true,
//     credentials: true
// }))

app.use( (req, res, next) =>{

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    next();// Pass to next layer of middleware
});

//init middeware
app.use(express.json({extended: false}))

app.get("/", (req, res) => res.send("Hello World"))
app.use("/mail", require("./api/routes/mail"))
app.use("/users", require("./api/routes/users"))
app.use("/employees", require("./api/routes/employees"))


// app.post("/login", (req, res)=>{
//     res.json({accessToken: jwt.sign(process.env.ACCESS_TOKEN_SECRET), user: req.body})
// })

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
