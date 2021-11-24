const express = require("express");

const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const { verifyAccessToken } = require("../../JWT");

// const path = require("path");
// const multer = require("multer");

const employeeRouter = express.Router({ mergeParams: true });

// var storage = multer.diskStorage({
//      destination: function (req, res, cb) {
//           cb(null, "uploads/");
//      },
//      filename: function (req, file, cb) {
//           let ext = path.extname(file.originalname);
//           cb(null, Date.now() + ext);
//      },
// });

// var upload = multer({
//      storage: storage,
//      fileFilter: function (req, file, callback) {
//           if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
//                callback(null, true);
//           } else {
//                console.error({ error: "only png and jpg file supported" });
//                callback(null, false);
//           }
//      },
//      limits: {
//           fileSize: 1024 * 1024 * 2,
//      },
// });

employeeRouter.get("/", (req, res) => {
     Employee.find({ user: req.params.id })
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));
});

employeeRouter.post("/", verifyAccessToken, (req, res) => {
     // console.log("employeeRouter: ", req.params);
     // console.log("employeeRouter, req.body: ", req.body);
     Employee.create({ ...req.body, user: req.params.id })
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));
});

employeeRouter.put("/:employeeId", verifyAccessToken, (req, res) => {
     Employee.findByIdAndUpdate(req.params.employeeId, req.body, { returnNewDocument: true })
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));

     // Employee.findOneAndUpdate({id: req.body_id}, req.body)
     //      .then((data) => {
     //           res.json(data);
     //      })
     //      .catch((err) => res.json({ error: err }));
     // User.findByIdAndUpdate({ employees: { $elemMatch: { _id: req.params.employeeId } } })
     //      .then((data) => {
     //           res.json(data);
     //           // const result = data.employees.filter((elm) => elm._id == req.params.employeeId);
     //           // res.send(result);
     //      })
     //      .catch((err) => res.json({ error: err }));
});

employeeRouter.delete("/:employeeId", verifyAccessToken, (req, res) => {
     console.log("del: ", req.params.employeeId);
     Employee.findByIdAndDelete(req.params.employeeId)
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));
});

employeeRouter.get("/:employeeId", (req, res) => {
     console.log(req.params);
     Employee.find({ _id: req.params.employeeId })
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));

     // Employee.findOneAndUpdate({id: req.body_id}, req.body)
     //      .then((data) => {
     //           res.json(data);
     //      })
     //      .catch((err) => res.json({ error: err }));
     // User.findByIdAndUpdate({ employees: { $elemMatch: { _id: req.params.employeeId } } })
     //      .then((data) => {
     //           res.json(data);
     //           // const result = data.employees.filter((elm) => elm._id == req.params.employeeId);
     //           // res.send(result);
     //      })
     //      .catch((err) => res.json({ error: err }));
});

module.exports = employeeRouter;