
const mongoose = require("mongoose");

const flowSchema = new mongoose.Schema({
    flow_ID:{
        type: Number,
        required: [true, "enter the flow ID"]
    },
    flow_index:[{type: Number}]
});

const Flow = new mongoose.model('Flow', flowSchema);

module.exports = Flow;