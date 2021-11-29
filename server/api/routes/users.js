const express = require("express");

const User = require("../models/User");
const bcrypt = require("bcrypt");
const { verifyAccessToken } = require("../../JWT");

const userRouter = express.Router();

userRouter.post("/find", (req, res) => {
     User.findOne(req.body)
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));
});

userRouter.post("/create", verifyAccessToken, (req, res) => {
     console.log(req.body);
     User.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) })
          .then((data) => {
               console.log(data);
               res.json(data);
          })
          .catch((err) => res.json({ error: err }));
});

userRouter.post("/get", verifyAccessToken, (req, res) => {
     console.log("user headers", req.headers);
     console.log("user: ", req.body.payload);
     User.findById(req.body.payload.id)
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err}));
});

userRouter.put("/:id", verifyAccessToken, (req, res) => {
     User.findByIdAndUpdate(req.body.payload.id, req.body, { new: true })
          .then((data) => res.json(data))
          .catch((err) => console.error({ error: err }));
});


//test route only
userRouter.get("/", (req, res) => {
     User.find()
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});

userRouter.post("/:id", (req, res) => {
     User.findByIdAndUpdate(req.params.id, req.body)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});
userRouter.delete("/delete", (req, res) => {
     User.deleteMany()
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});

module.exports = userRouter;