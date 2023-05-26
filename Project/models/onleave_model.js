
const mongoose = require('mongoose');

const onleaveSchema = new mongoose.Schema({
    empID: {//applicant id
        type: String,
        required: true
    },
    applID:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    starts:{
        type: Date,
        required: true
    },
    ends:{
        type: Date,
        required: true
    }
});

const  OnLeave = new mongoose.model('Onleave', onleaveSchema);

module.exports = OnLeave;