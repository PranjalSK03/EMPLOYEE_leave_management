
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    employeeId:{
        type: String,
        required: true,
        // ref: 'Employee'
    },
    applicationHeader:{
        type: String,
        required: true
    },
    leaveStarts: {
        type: Date
    },
    leaveEnds:{
        type: Date
    },
    applicationBody:{
        type: String
    },
    Remarks:[{
        type: String,
    }],
    locationOfAppl:{
        flowType:{
            type: Number
        },
        level:{
            type: Number
        },
        levelName:{
            type: String
        },
        index:{
            type: Number
        }
    },
    applicationStatus:{
        type: String,
        required: true,
        default: "Pending"
    },
    timestampApplication:{
        type: Date,
        default: Date.now()
    },
    timestampForward: [{
        type: Date
    }],
    timestampAccOrRej:{
        type: Date,
    }
});

const Application = new mongoose.model('Application', applicationSchema);

module.exports = Application;