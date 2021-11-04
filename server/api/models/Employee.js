const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const EmployeeSchema = new Schema({
     // _creator: { type: mongoose.Schema.ObjectId, ref: "User" },
     user: {
          type: Schema.Types.ObjectId,
          ref: "User",
     },
     name: {
          type: String,
          // required: true
     },
     image: {
          type: String,
     },
     password: {
          type: String,
     },
     tel: {
          type: String,
     },
     remark: {
          type: String,
     },
     date: {
          type: String,
     },
     update_date: {
          type: Date,
          default: Date.now,
          // required: true,
     },
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
// module.exports = EmployeeSchema;
