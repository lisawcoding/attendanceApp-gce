const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => {
     User.find()
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
     User.create(req.body)
          .then((data) => {
               console.log(data);
               res.json({ success_msg: "user added sucessfully" });
          })
          .catch((err) => res.json("router post/ ERR: ", err));
});

router.post("/find", (req, res) => {
     User.findOne(req.body)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});

router.put("/edit", (req, res) => {
     const password = req.body.password;
     User.findByIdAndUpdate(req.body._id)
          .then((data) => res.json({ status: "success edit", result: data }))
          .catch((err) => res.json({ status: "err edit", result: err }));
});

router.put("/:id", (req, res) => {
     User.findByIdAndUpdate(req.params.id, req.body)
          .then((data) => res.json({ status: "success edit", result: data }))
          .catch((err) => res.json({ status: "err edit", result: err }));
});

module.exports = router;
