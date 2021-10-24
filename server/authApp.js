const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./api/models/User");

const app = express();
connectDB();
dotenv.config();

app.use((req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
     res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization");
     next();
});
app.use(express.json({ extended: true }));

app.get("/", (req, res) => res.send("authApp"));

app.post("/login", async (req, res) => {
     const user = await User.findOne({ email: req.body.email });
     console.log(user);

     if (!user) return res.json({ error: "this email is not registerdd" });

     bcrypt.compare(req.body.password, user.password).then((result) => {
          if (!result) return res.json({ error: "wrong password" });

          //email and password are correct
          try {
               const id = { id: user._id };
               const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "10m",
               });
               const refreshToken = jwt.sign(id, process.env.REFRESH_TOKEN_SECRET);

               res.json({
                    success: result,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
               });
          } catch (err) {
               res.json({ status: "error", result: err });
          }
     });
});

app.post("/token", (req, res) => {
     const refreshToken = req.headers.authorization.split(" ")[1];

     if (refreshToken == null) return res.status(401).json({ status: "err", result: "no refresh token" });
     if (!refreshToken.includes(refreshToken)) return res.status(403).json({ status: "err", result: "no Employee found" });

     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
          if (err) return res.status(403).json({ status: "err", result: err });

          console.log(`decoded:`, decoded);
          const accessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, {
               expiresIn: "5m",
          });
          res.json({ status: "success: token verified", result: accessToken });
     });
});

app.delete("/logout", (req, res) => {
     // refreshToken
});

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => console.log(`AuthServer running on ${PORT}`));
