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
     name: {
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
     setting: {
          type: Setting,
          default: { Setting }
     },
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

module.exports = User = mongoose.model("user", UserSchema);