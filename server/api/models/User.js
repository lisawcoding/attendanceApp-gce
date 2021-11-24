const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Setting = new Schema(
     {
          timeIn: {
               type: String,
               default: "09:00",
          },
          timeOut: {
               type: String,
               default: "18:00",
          },
     },
     { _id: false }
);

const UserSchema = new Schema({
     username: {
          type: String,
     },
     companyName: {
          type: String,
     },
     email: {
          type: String,
          unique: true,
     },
     password: {
          type: String,
     },
     password2: {
          type: String,
     },
     mailLimit: {
          type: Number,
          default: 0,
     },
     setting: Setting,
     employees: [
          {
               type: Schema.Types.ObjectId,
               ref: "Employee",
          },
     ],
     // employees: [EmployeeSchema],
     // employees: [{ type: Schema.ObjectId, ref: "Employee" }],
     // refreshToken: {
     //      type: String,
     // },
     update_date: {
          type: Date,
          default: Date.now,
     },
});

// module.exports = Employee = mongoose.model("employee", EmployeeSchema);
module.exports = User = mongoose.model("user", UserSchema);

// const EmployeeSchema = require("../models/Employee");
// const EmployeeSchema = new Schema({
//      // _creator: { type: mongoose.Schema.ObjectId, ref: "User" },
//      user: {
//           type: Schema.Types.ObjectId,
//           ref: "User",
//      },
//      name: {
//           type: String,
//           // required: true
//      },
//      image: {
//           type: String,
//      },
//      password: {
//           type: String,
//      },
//      tel: {
//           type: String,
//      },
//      remark: {
//           type: String,
//      },
//      date: {
//           type: String,
//      },
//      update_date: {
//           type: Date,
//           default: Date.now,
//           // required: true,
//      },
// });