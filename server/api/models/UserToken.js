const mongoose = require("mongoose");

const UserTokenSchema = new mongoose.Schema({
     id: {
          type: String,
     },
     token: {
          type: String,
     },
     email: {
          type: String,
     },
     update_date: {
          type: Date,
          default: Date.now,
     },
});

module.exports = UserToken = mongoose.model("userToken", UserTokenSchema);
