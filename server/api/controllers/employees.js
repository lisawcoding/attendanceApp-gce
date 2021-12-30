const Employee = require("../models/Employee");

module.exports.getEmployees = (req, res) => {
    Employee.find({ user: req.params.id })
         .then((data) => res.json(data))
         .catch((err) => res.json({ error: err }));
}

module.exports.getEmployee = (req, res) => {
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
}

module.exports.postEmployee =  (req, res) => {
    Employee.create({ ...req.body, user: req.params.id })
         .then((data) => res.json(data))
         .catch((err) => res.json({ error: err }));
}

module.exports.deleteEmployee = (req, res) => {
    console.log("del: ", req.params.employeeId);
    Employee.findByIdAndDelete(req.params.employeeId)
         .then((data) => res.json(data))
         .catch((err) => res.json({ error: err }));
}

module.exports.putEmployee = (req, res) => {
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
}
