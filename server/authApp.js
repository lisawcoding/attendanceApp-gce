const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./api/models/User");
const { signAccessToken, signRefreshToken, verifyAccessToken } = require("./JWT");
const UserToken = require("./api/models/UserToken");

const app = express();
connectDB();
dotenv.config();

app.use((req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
     res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization, x-token");
     next();
});
app.use(express.json({ extended: true }));

app.get("/", (req, res) => res.send("authApp"));

app.use("/register", require("./api/routes/register"));

app.post("/login", async (req, res) => {
     const user = await User.findOne({ email: req.body.email });
     console.log(user);

     if (!user) return res.json({ error: "this email is not registerdd" });

     bcrypt.compare(req.body.password, user.password).then(async (result) => {
          if (!result) return res.json({ error: "wrong password" });

          try {
               await UserToken.deleteMany({ id: user._id })
                    .then((data) => console.log("deleteUserToken: ", data))
                    .catch((err) => console.log("deleteUserToken err: ", err));

               const accessToken = signAccessToken({ id: user._id });
               const refreshToken = signRefreshToken({ id: user._id });

               res.json({
                    success: result,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: user,
               });
               UserToken.create({ id: user._id, token: refreshToken, email: req.body.email })
                    .then((data) => console.log("userToken", data))
                    .catch((err) => console.log("err", err));
          } catch (err) {
               console.log(err);
          }
     });
});

app.post("/reIssueToken", (req, res) => {
     const refreshToken = req.headers.authorization.split(" ")[1];

     if (refreshToken == null) return res.status(401).json({ error: "refresh token does not exist" });

     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
          if (err) return res.status(403).json({ error: err });

          let userToken = await UserToken.find({ id: payload.id }).sort({ createdAt: -1 }).limit(1);
          userToken = userToken[0];
          console.log(userToken);
          if (!userToken) return res.json({ error: "User token does not exist" });
          if (userToken.token !== refreshToken) return res.json({ error: "Old token. Not valid anymore." });

          await UserToken.findOneAndUpdate({ _id: userToken._id }, { $set: { refreshToken: refreshToken } });

          let accessToken = signAccessToken({ id: payload.id });
          res.json({ accessToken: accessToken });
     });
});

app.put("/update_password", verifyAccessToken, (req, res) => {
     console.log(req.body);
     User.findOneAndUpdate(
          { email: req.body.email },
          { $inc: { mailLimit: 1 }, $set: { password: bcrypt.hashSync(req.body.password, 10) } },
          { useFindAndModify: false, returnNewDocument: true, new: true }
     )
          .then((data) => {
               res.json({ status: "success", result: data });
          })
          .catch((err) => res.json({ status: "err", result: err }));
});

app.delete("/logout", (req, res) => {
     UserToken.deleteMany(req.body._id)
          .then((data) => console.log("deleteUserToken: ", data))
          .catch((err) => console.log("deleteUserToken err: ", err));
});

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => console.log(`AuthServer running on ${PORT}`));
