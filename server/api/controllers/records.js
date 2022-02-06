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

const createRecords = (req, res) => {
    console.log("record/Router.params: ", req.params);
    console.log("record/Router.body: ", req.body);

    Record.findOneAndUpdate({ employee: req.params.employeeId, date: req.body.date }, req.body, { new: true })
         .then((data) => {
              if(data==null){
                   Record.create(req.body)
                   .then(data=>res.json({create: data}))
                   .catch(err=>res.json({error: err}))
              } else {
                   res.json({update: data});   
              }
              // if(data.length<1) {
              //      res.json("no record")
              //      // Record.create(req.body)
              //      // .then(data=>res.json(data))
              //      // .catch(err=>res.json({error: err}))
              // } else {
              //      res.json("find one record")
              //      Record.updateOneAndUpdate({employee: req.params.employeeId, date: req.body.date} , req.body)
              //      .then(data=>res.json(data))
              //      .catch(err=>res.json({error: err}))
              // }
              // res.json({ msg: "duplicate data", result: data });
         })
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

module.exports = { getRecords, postRecords, deleteRecords, putRecords, createRecords }