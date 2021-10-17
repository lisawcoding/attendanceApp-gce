const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const jwt=require("jsonwebtoken");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI= process.env.GOOGLE_REDIRECT_URI
const GOOGLE_REFRESH_TOKEN= process.env.GOOGLE_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN})

router.get("/", (req, res)=>res.send("mail"))

router.post("/", async(req, res)=> {
    console.log(req.body);
    
    const accessToken = await oAuth2Client.getAccessToken();

    const jwtToken = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m"})
    console.log(jwtToken)

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "tolisapc@gmail.com",
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            refreshToken: GOOGLE_REFRESH_TOKEN,
            accessToken: accessToken,
        }   
    })

    const mailOptions= {
        from: "Attendance APP <tolisapc@gmail.com>",
        to: req.body.email,
        subject: "Attendance APP email confirmation, nodemail發送的測試信件",
        text:"Attendance APP email confirmation",
        html: `<h1>hello <span>${req.body.name}</span></h1>
        <h1>please copy and past the below token: </h1><p>${jwtToken}</p>`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log("result error: ", error)
        } else {
            console.log("mail sent: ", info)
            res.json({info: info, status: "success"})
        }
    }) 
})

    
function authenticateToken(req, res, next) {
    // const authHeader = req.headers["authorization"]
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if(token==null) return res.json({status: "no token"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email)=>{
        // if(err) return res.json({status: err.JsonWebTokenError})
        if(err) return res.json({status: "err", info: err})
        return res.json({status: "verify successfully", email: email})
        next()
    })
}

router.post("/auth", authenticateToken, (req, res) => {
    

})

module.exports=router;