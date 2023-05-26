
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    deptID:{
        type: Number,
        required: true,
        unique: true
    },
    deptName:{
        type: String,
        required: true,
    }
});

const Department = new mongoose.model('Department', departmentSchema);

module.exports = Department;