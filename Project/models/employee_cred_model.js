
const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    empID:{
        type: String,
        required: [true, 'Enter you employee ID'],
        unique: true,
        ref: 'Employee'
    },
    Password:{
        type: String,
        required: [true, "Enter your password"],
    }
});

const Credetial = new mongoose.model('Credential', credentialSchema);

module.exports = Credetial;
