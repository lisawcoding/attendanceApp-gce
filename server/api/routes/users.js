const express = require("express");

const User = require("../models/User");
const { verifyAccessToken } = require("../../JWT");
const { findUsers, postUser, getUser, putUser } = require("../controllers/users.js");

const userRouter = express.Router();

userRouter.post("/find", findUsers);
userRouter.post("/create", verifyAccessToken, postUser);
userRouter.post("/get", verifyAccessToken, getUser );
userRouter.put("/:id", verifyAccessToken, putUser);


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