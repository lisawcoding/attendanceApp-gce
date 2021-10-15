const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    update_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("user", UserSchema);