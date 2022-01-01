const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.findUsers = (req, res) => {
    User.findOne(req.body)
         .then((data) => res.json(data))
         .catch((err) => res.json({ error: err }));
}

module.exports.postUser = (req, res) => {
    console.log(req.body);
    User.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) })
         .then((data) => {
              console.log(data);
              res.json(data);
         })
         .catch((err) => res.json({ error: err }));
}

module.exports.getUser = (req, res) => {
    console.log("user headers", req.headers);
    console.log("user: ", req.body.payload);
    User.findById(req.body.payload.id)
         .then((data) => res.json(data))
         .catch((err) => res.json({ error: err}));
}

module.exports.putUser = (req, res) => {
    User.findByIdAndUpdate(req.body.payload.id, req.body, { new: true })
         .then((data) => res.json(data))
         .catch((err) => console.error({ error: err }));
}