const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    image: {
        type: String
    },    
    id: {
        type: String,
        // require: true
    },
    password: {
        type: String,
        // required: true,
    }, 
    tel: {
        type: String
    },
    position: {
        type: String,
    },
    remark: {
        type: String,
    },
    date: {
        type: String,
    },
    update_date: {
        type: Date,
        default: Date.now,
        // required: true,
    }
})

module.exports = Employee = mongoose.model("employee", EmployeeSchema)