const express = require("express");

// const User = require("../models/User");
// const Employee = require("../models/Employee");
// const bcrypt = require("bcrypt");
const { verifyAccessToken } = require("../../JWT");
const { getEmployees, postEmployee, deleteEmployee, getEmployee, putEmployee } = require("../controllers/employees");

const employeeRouter = express.Router({ mergeParams: true });

employeeRouter.get("/", getEmployees);
employeeRouter.get("/:employeeId", getEmployee);
employeeRouter.post("/", verifyAccessToken, postEmployee);
employeeRouter.put("/:employeeId", verifyAccessToken, putEmployee);
employeeRouter.delete("/:employeeId", verifyAccessToken, deleteEmployee);

module.exports = employeeRouter;

