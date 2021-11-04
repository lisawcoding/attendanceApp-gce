const jwt = require("jsonwebtoken");
const UserToken = require("./api/models/UserToken");

const signAccessToken = (user) => {
     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "10s",
     });
};
const signRefreshToken = (user) => {
     return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "10h",
     });
};

// app.post("/reIssueToken", (req, res) => {
//      const refreshToken = req.headers.authorization.split(" ")[1];

//      if (refreshToken == null) return res.status(401).json({ error: "refresh token does not exist" });

//      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
//           if (err) return res.status(403).json({ error: err, info: "refreshToken" });

//           let userToken = await UserToken.find({ id: payload.id }).sort({ createdAt: -1 }).limit(1);
//           userToken = userToken[0];
//           console.log(userToken);
//           if (!userToken) return res.json({ error: "User token does not exist" });
//           if (userToken.token !== refreshToken) return res.json({ error: "Old token. Not valid anymore." });

//           await UserToken.findOneAndUpdate({ _id: userToken._id }, { $set: { refreshToken: refreshToken } });

//           let accessToken = signAccessToken({ id: payload.id });
//           res.json({ accessToken: accessToken });
//      });
// });

// const verifyAccessToken = (req, res, next) => {
//      // console.log("req.headers: ", req.headers);
//      console.log("req.headers.auth: ", req.headers.authorization);
//      console.log("req.headers.auth2: ", req.headers.authorization2);
//      const accessToken = req.headers.authorization.split(" ")[1];

//      if (accessToken == null) return res.status(401).json({ error: "no access token" });

//      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
//           if (error) {
//                const refreshToken = req.headers.authorization2.split(" ")[1];
//                console.log("refreshToken: ", refreshToken);

//                if (refreshToken == null) return res.status(401).json({ error: "refresh token does not exist" });

//                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
//                     if (err) return res.status(403).json({ error: err });
//                     console.log("re payload: ", payload);
//                     //check userToken in database
//                     let userToken = await UserToken.find({ id: payload.id }).sort({ createdAt: -1 }).limit(1);
//                     userToken = userToken[0];
//                     console.log(userToken);
//                     if (!userToken) return res.json({ error: "User token does not exist" });
//                     if (userToken.token !== refreshToken) return res.json({ error: "Old token. Not valid anymore." });
//                     await UserToken.findOneAndUpdate({ _id: userToken._id }, { $set: { refreshToken: refreshToken } });

//                     let accessToken = signAccessToken({ id: payload.id });
//                     // res.json({ accessToken: accessToken });

//                     res.body.accessToken = accessToken;
//                     req.body.payload = payload;
//                });
//           } else {
//                req.body.payload = payload;
//                console.log("access payload", payload);
//           }
//           next();
//      });
// };

// const reIssueAccessToken = (req, res, next) => {
//      const refreshToken = req.headers.authorization2.split(" ")[1];
//      console.log("refreshToken: ", refreshToken);

//      if (refreshToken == null) return res.status(401).json({ error: "refresh token does not exist" });

//      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
//           if (err) return res.status(403).json({ error: err });

//           //check userToken in database
//           let userToken = await UserToken.find({ id: payload.id }).sort({ createdAt: -1 }).limit(1);
//           userToken = userToken[0];
//           console.log(userToken);
//           if (!userToken) return res.json({ error: "User token does not exist" });
//           if (userToken.token !== refreshToken) return res.json({ error: "Old token. Not valid anymore." });
//           await UserToken.findOneAndUpdate({ _id: userToken._id }, { $set: { refreshToken: refreshToken } });

//           let accessToken = signAccessToken({ id: payload.id });
//           res.json({ accessToken: accessToken });
//           next();
//      });
// };
const verifyAccessToken = (req, res, next) => {
     console.log("verifyAccessToken: ", req.headers);
     console.log("verifyAccessToken: ", req.headers.authorization);
     const accessToken = req.headers.authorization.split(" ")[1];

     if (accessToken == null) return res.status(401).json({ error: "no access token" });

     jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
          if (error) return res.json({ error: error, accessToken: accessToken });
          req.body.payload = payload;
          next();
     });
};

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken };
