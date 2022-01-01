const jwt = require("jsonwebtoken");

const signAccessToken = (user) => {
     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "10m",
     });
};

const signRefreshToken = (user) => {
     return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "10h",
     });
};

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