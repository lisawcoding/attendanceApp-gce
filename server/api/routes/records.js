const express = require("express");

// const Employee = require("../models/Employee");
const Record = require("../models/Record");
const { verifyAccessToken } = require("../../JWT");

const recordRouter = express.Router({ mergeParams: true });

recordRouter.post("/", verifyAccessToken, (req, res) => {
     console.log("record/Router.params: ", req.params);
     console.log("record/Router.body: ", req.body);

     Record.find({ employee: req.params.employeeId, date: req.body.date })
          .then((data) => {
               console.log(data);
               if(data.length<1) {
                    res.json("no record")
                    // Record.create(req.body)
                    // .then(data=>res.json(data))
                    // .catch(err=>res.json({error: err}))
               } else {
                    res.json("find one record")
                    // Record.updateOneAndUpdate({employee: req.params.employeeId, date: req.body.date} , req.body)
                    // .then(data=>res.json(data))
                    // .catch(err=>res.json({error: err}))
               }
               // res.json({ msg: "duplicate data", result: data });
          })
          .catch((err) => res.json({ error: err }));
});
// Record.create({ ...req.body, employee: req.params.employeeId })
//      .then((data) => res.json(data))
//      .catch((err) => res.json({ error: err }));

//test only
recordRouter.get("/", (req, res) => {
     Record.find()
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));
});
recordRouter.get("/:date", (req, res) => {
     console.log("/:date", req.params);
     Record.find({ date: req.params.date })
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));
});
module.exports = recordRouter;