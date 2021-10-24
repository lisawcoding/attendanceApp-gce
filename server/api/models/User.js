const mongoose = require("mongoose");
const EmployeeSchema = require("../models/Employee");

const UserSchema = new mongoose.Schema({
     username: {
          type: String,
     },
     name: {
          type: String,
     },
     email: {
          type: String,
     },
     password: {
          type: String,
     },
     password2: {
          type: String,
     },
     setting: {
          type: Object,
     },
     mailLimit: {
          type: Number,
          default: 0,
     },
     //  employees: [EmployeeSchema],
     //  accessToken: {
     //       type: String,
     //  },
     //  refreshToken: {
     //       type: String,
     //  },
     update_date: {
          type: Date,
          default: Date.now,
     },
});

module.exports = User = mongoose.model("user", UserSchema);
