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

router.post("");

module.exports = router;
