const mongoose = require("mongoose");
const EmployeeSchema = require("../models/Employee");

const CompanySchema = new mongoose.Schema({
     name: {
          type: String,
     },
     email: {
          type: String,
     },
     user_id: {
          type: String,
     },
     setting: {
          type: Object,
     },
     //  employees: [EmployeeSchema],
     update_date: {
          type: Date,
          default: Date.now,
     },
});

module.exports = Company = mongoose.model("company", CompanySchema);
