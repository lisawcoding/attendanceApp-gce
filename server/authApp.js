const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();
dotenv.config();
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
     res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization");
     next();
});

app.get("/", (req, res) => res.send("authApp"));

app.post("/login", (req, res) => {
     const emailObj = { email: req.body.email };
     const accessToken = jwt.sign(emailObj, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "2m",
     });
     const refreshToken = jwt.sign(emailObj, process.env.REFRESH_TOKEN_SECRET);
     res.json({
          status: "success",
          result: req.body,
          accessToken: accessToken,
          refreshToken: refreshToken,
     });
});

app.post("/token", (req, res) => {
     console.log(req.body);
     const refreshToken = req.body.token;
     if (refreshToken == null) return res.json({ status: "err", result: "no refresh token" });
     if (!refreshToken.includes(refreshToken)) return res.json({ status: "err", result: "not include refresh token" });
     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
          if (err) {
               return res.json({ status: "err", result: err });
          } else {
               console.log(`decoded:`, decoded);
               const accessToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "5m",
               });
          }
          //   const accessToken = jwt.sign({email: re})
     });
});

app.delete("/logout", (req, res) => {
     // refreshToken
});

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => console.log(`AuthServer running on ${PORT}`));
