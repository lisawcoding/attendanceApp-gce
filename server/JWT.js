const jwt = require("jsonwebtoken");
const UserToken = require("./api/models/UserToken");

const signAccessToken = (user) => {
     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "5m",
     });
};
const signRefreshToken = (user) => {
     return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "10h",
     });
};

// const authAccessToken = (req, res) => {};

// const authRefreshToken = (req, res) => {
//      const refreshToken = req.headers.authorization.split(" ")[1];

//      if (refreshToken == null) return res.status(401).json({ error: "no refresh token" });
//      // if (!refreshToken.includes(refreshToken)) return res.status(403).json({ error: "no Employee found" });

//      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//           if (err) return res.status(403).json({ error: err });

//           console.log(`decoded:`, decoded);
//           const accessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, {
//                expiresIn: "5m",
//           });
//           res.json({ status: "success: token verified", result: accessToken });
//      });
// };

module.exports = { signAccessToken, signRefreshToken };

// const VerifySignToken = (req, res)=>{
//     const refreshToken = req.headers.authorization.split(" ")[1];

//     if (refreshToken == null) return res.status(401).json({ error: "no refresh token" });
//     // if (!refreshToken.includes(refreshToken)) return res.status(403).json({ error: "no Employee found" });

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//          if (err) return res.status(403).json({ error: err });

//          console.log(`decoded:`, decoded);
//          const accessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, {
//               expiresIn: "5m",
//          });
//          res.json({ status: "success: token verified", result: accessToken });
//     });
// }
