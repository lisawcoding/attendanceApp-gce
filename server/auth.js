const express = require("express");
// const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = express.Router({mergeParams: true});

const User = require("./api/models/User");
const { signAccessToken, verifyAccessToken } = require("./JWT");
const UserToken = require("./api/models/UserToken");
const { handleLoginTokens } = require("./api/controllers/authApp");
const { postUser } = require("./api/controllers/users");

// dotenv.config();

authRouter.get("/", (req, res) => res.send("authApp"));

authRouter.use("/register", require("./api/routes/register"));

authRouter.post("/login", async (req, res) => {
     console.log("/login, req.body: ", req.body)

     const user = await User.findOne({ email: req.body.email });
     if (!user) return res.json({ error: "this email is not registerd" });
     bcrypt.compare(req.body.password, user.password).then(async (result) => {
          console.log("bcrypt: ", result);
          console.log(user)
          if (!result) return res.json({ error: "wrong password" });
     });      
     handleLoginTokens(req, res, user)     
}); 

authRouter.post("/googleLogin", async (req, res) => {
     console.log("google login: ", req.body)

     const user = await User.findOne({email: req.body.email})
     if(!user) postUser(req, res);
     handleLoginTokens(req, res, user)
})

authRouter.post("/reIssueToken", (req, res) => {
     const refreshToken = req.headers.authorization.split(" ")[1];

     if (refreshToken == null) return res.status(401).json({ error: "refresh token does not exist" });

     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
          console.log("env*******************")
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

authRouter.put("/update_password", verifyAccessToken, (req, res) => {
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

authRouter.delete("/logout", (req, res) => {
     UserToken.deleteMany(req.body._id)
          .then((data) => console.log("deleteUserToken: ", data))
          .catch((err) => console.log("deleteUserToken err: ", err));
});

module.exports = authRouter;