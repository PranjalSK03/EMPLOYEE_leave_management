
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empID:{
        type: String,
        required: [true, 'Enter your employee ID'],
        unique: true
    },
    empName:{
        type: String,
        required: [true, 'Enter your name'],
    },
    empDept:{
        type: String,
        required: [true, 'Enter department']
    },
    designation:{
        type: String,
        required: [true, 'Choose designation']
    },
    noOfLeaves: {
        type: Number,
        required: [true, 'Enter no. of leaves'],
        default: 15
    },
    leavesTaken: {
        type: Number,
        required: [true, 'Enter no. of leaves'],
        default: 0
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Application'
    }]
});

const Employee = new mongoose.model('Employee', employeeSchema);

module.exports = Employee;


