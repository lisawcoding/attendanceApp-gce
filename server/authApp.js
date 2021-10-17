const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();
dotenv.config()

app.use(express.json({extended: false}))

function authenticateToken(req, res, next) {
    console.log(req.authHeader)
    const authHeader = req.authHeader.authorization
    // const 
}

function generateAcessToken(elm) {
    return jwt.sign(elm, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"})
}

app.get("/", (req, res)=> res.send("authApp"))
app.post("/login", (req, res)=> {
    const email=req.body.email
    const accessToken=generateAcessToken(email)
    const refreshToken = jwt.sign(email, process.env.REFRESH_TOKEN_SECRET)
})

const PORT =process.env.PORT || 9002;
app.listen(PORT, ()=> console.log(`AuthServer running on ${PORT}`))
