
const mongoose = require('mongoose');


const designationSchema = new mongoose.Schema({
    desigID:{
        type: Number,
        requried: true,
        unique: true
    },
    desigName:{
        type: String,
        required: true
    }
});

const Designation = new mongoose.model('Designation', designationSchema);

module.exports = Designation;