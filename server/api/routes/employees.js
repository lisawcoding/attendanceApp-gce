const express = require("express");
const router = express.Router();
const multer = require('multer')

const Employee = require("../models/Employee");

router.get('/', (req, res)=> {
    Employee.find()
    .then(data => res.json(data))
    .catch(err=> res.json(err))
    .catch(err => res.status(404).json({error: "no Employee found"}));
})

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({error: "no Employee found"}))
})

router.post('/', (req, res) => {
    Employee.create(req.body)
    .then(data => {
        console.log(data)
        res.json({msg: "Employee added successfully"})})
    // .catch(err => res.status(400).json({error: "unable to add this data"}))
    .catch(err => res.json("router error: " + err))
})

router.put('/:id', (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, req.body)
    .then(data => res.json({msg: "updated successfully"}))
    .catch(err => res.status(400).json({error: "unable to update this data"}))
})

router.delete("/:id", (req, res) => {
    console.log(req.params)
    Employee.findByIdAndDelete(req.params.id)
    .then( data => res.json({msg: "data deleted successfully"}))
    .catch( err => res.status(404).json({error: "no such a book"}))
})

module.exports = router;