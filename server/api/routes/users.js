const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const auth = require("./middleware/auth");

//test route only
router.get("/", (req, res) => {
     User.find()
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});

router.get("/:id", (req, res) => {
     User.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});
router.delete("/delete", (req, res) => {
     User.deleteMany()
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});
//test route only

router.post("/", (req, res) => {
     console.log(req.body);
     User.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) })
          .then((data) => {
               console.log(data);
               res.json({ success_msg: "user added sucessfully" });
          })
          .catch((err) => res.status(400).json("router post/ ERR: ", err));
});

router.post("/find", (req, res) => {
     const accessToken = req.headers.authorization.split(" ")[1];

     if (accessToken == null) return res.status(401).json({ error: "no access token" });

     // verify aceesstoken
     jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
          console.log(payload);
          if (error) return res.json({ error: error });

          // res.json("accessToken ok");
          //  get user
          User.findById(payload.id)
               .then((data) => res.json(data))
               .catch((err) => res.json({ error: err }));
     });
});

router.post("/:id", (req, res) => {
     console.log(req.headers.authorization);
     User.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});

router.put("/mailLimit", (req, res) => {
     User.findOneAndUpdate(
          { email: req.body.email },
          { $inc: { mailLimit: 1 }, $set: { password: bcrypt.hashSync(req.body.password, 10) } },
          { useFindAndModify: false, returnNewDocument: true, new: true }
     )
          .then((data) => {
               res.json({ status: "success update user", result: data });
          })
          .catch((err) => res.json({ status: "err", result: err }));
});

module.exports = router;
