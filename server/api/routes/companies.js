const express = require("express");
const router = express.Router();

const Company = require("../models/Company");

router.get("/", (req, res) => {
     Company.find()
          .then((data) => res.json({ status: "success", result: data }))
          .catch((err) => res.json({ status: "err", result: err }));
     // .catch((err) => res.status(404).json({ error: "no Company found" }));
});

router.get("/:id", (req, res) => {
     Company.findById(req.params.id)
          .then((data) => res.json({ status: "success", result: data }))
          .catch((err) => res.status(404).json({ error: "no Company found" }));
});

// router.post("/", (req, res) => {

//      Company.create(req.body)
//           .then((data) => res.json({ status: "success", result: data, msg: "Company added successfully" }))
//           .catch((err) => res.json({ status: "err", result: err }));
// });

// router.put("/:id", (req, res) => {
//      Company.findByIdAndUpdate(req.params.id, req.body)
//           .then((data) => res.json({ status: "success", result: data, msg: "updated successfully" }))
//           .catch((err) => res.json({ status: "err", result: err }));
//      // .catch((err) => res.status(400).json({ error: "unable to update this data" }));
// });

// router.delete("/:id", (req, res) => {
//      console.log(req.params);
//      Company.findByIdAndDelete(req.params.id)
//           .then((data) => res.json({ msg: "data deleted successfully" }))
//           .catch((err) => res.json({ status: "err", result: err }));
// });

module.exports = router;
