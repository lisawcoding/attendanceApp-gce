const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
// const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

// const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

router.get("/", (req, res) => res.send("mail"));

router.post("/mail", async (req, res) => {
     console.log("req.body: ", req.body);

     const jwtToken = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
     // const accessToken = await oAuth2Client.getAccessToken();
     // const transporter = nodemailer.createTransport({
     //      service: "gmail",
     //      auth: {
     //           type: "OAuth2",
     //           user: "tolisapc@gmail.com",
     //           clientId: GOOGLE_CLIENT_ID,
     //           clientSecret: GOOGLE_CLIENT_SECRET,
     //           refreshToken: GOOGLE_REFRESH_TOKEN,
     //           accessToken: accessToken,
     //      },
     // });
     var transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
               user: "tolisacoding@hotmail.com",
               pass: process.env.HOTMAIL_PW,
          },
     });

     const mailOptions = {
          from: "Attendance APP <tolisacoding@hotmail.com>",
          to: req.body.email,
          subject: "Attendance APP email confirmation, nodemail發送的測試信件",
          text: "Attendance APP email confirmation",
          html: `<h1>hello <span>${req.body.name}</span></h1>
        <h1>please copy and past the below token: </h1><p>${jwtToken}</p>`,
     };

     transporter.sendMail(mailOptions, function (error, user) {
          return res.json({ status: "success", result: user, jwtToken: jwtToken, info: "mail sent succefully" });

          if (error) {
               console.log("result error: ", error);
          } else {
               console.log("mail sent: ", user);
               res.json({ status: "success", result: user, jwtToken: jwtToken, info: "mail sent succefully" });
          }
     });
});

function authenticateToken(req, res, next) {
     const authHeader = req.headers.authorization;
     const token = authHeader && authHeader.split(" ")[1];
     console.log(token);

     if (token == null) return res.json({ status: "err", result: "no token" });

     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) {
               console.log(err);
               res.json({ status: "err", result: err });
          } else {
               if (decoded.email !== req.body.email) return res.json({ status: "err", result: "wrong email" });
               res.json({ status: "success: jwt verify", result: decoded });
               // res.json({ status: "verify successfully", result: decoded });
          }
          next();
     });
}

router.post("/auth", authenticateToken, (req, res) => {});

module.exports = router;
