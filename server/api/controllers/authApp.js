const UserToken = require("../models/UserToken");
const { signAccessToken, signRefreshToken } = require("../../JWT");

const handleLoginTokens = async (req, res, user) => {
    console.log(user)
    try {
        await UserToken.deleteMany({ id: user._id })
             .then((data) => console.log("deleteUserToken: ", data))
             .catch((err) => console.log("deleteUserToken err: ", err));

        const accessToken = signAccessToken({ id: user._id });
        const refreshToken = signRefreshToken({ id: user._id });

        res.json({
             // success: result,
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
}

module.exports = { handleLoginTokens }