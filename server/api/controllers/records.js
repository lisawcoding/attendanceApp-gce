const Record = require("../models/Record");

const getRecords = (req, res) => {
     Record.find({ employee: req.params.employeeId})
         .then((data) => res.json(data))
         .catch((err) => res.json({ error: err }));
}

const postRecords = (req, res) => {
     console.log(req.body)
     Record.find({ employee: req.params.employeeId,  date: { $gte: req.body.firstDay, $lte: req.body.lastDay }})
        .then((data) => res.json(data))
        .catch((err) => res.json({ error: err }));
}

const deleteRecords = (req, res) => {
    console.log("del: ", req.params.recordId)
    Record.findByIdAndDelete(req.params.recordId)
    .then(data => res.json( data ))
    .catch(err=>res.json({ error: err }))
}

const putRecords = (req, res) => {
    console.log(":/recordId,put: ")
    console.log(req.params.recordId)
    console.log(req.body)
    Record.findByIdAndUpdate(req.params.recordId, req.body, { new: true} )
    .then(data=>res.json( data ))
    .catch(err=>res.json({ error: err }))
}

module.exports = { getRecords, postRecords, deleteRecords, putRecords }