const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

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
     setting: {
          type: Object,
     },
     mailLimit: {
          type: Number,
          default: 0,
     },
     employees: [
          {
               type: Schema.Types.ObjectId,
               ref: "Employee",
          },
     ],
     // employees: [EmployeeSchema],
     // employees: [{ type: Schema.ObjectId, ref: "Employee" }],
     refreshToken: {
          type: String,
     },
     update_date: {
          type: Date,
          default: Date.now,
     },
});

// module.exports = Employee = mongoose.model("employee", EmployeeSchema);
module.exports = User = mongoose.model("user", UserSchema);
