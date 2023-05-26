require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const Employee = require("../models/employee_model.js");
const Credentials = require("../models/employee_cred_model.js");
const Flow = require("../models/flow_model.js");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

//app.set("view engine", "ejs");

//                   0                  1               2                   3                         
var Position = ["Technical Staff", "HR staff", "Asst. Head Technical", "Head Technical",
                "Asst. Head HR", "Head HR", "CEO"];
//      


//admin only
router.get("/positions", (req, res)=>{
    res.send(Position);
});
router.get("/flow", (req, res)=>{
    Flow.find({})
    .then((entries)=>{
        res.send(entries);
    })
    .catch((err)=>{
        console.log(err);
    })
});



router.post("/positions", (req, res)=>{
    console.log(req.body);
    Position.push(req.body.pos);
    //Position.pop();
});
router.post("/flow", (req, res)=>{
    console.log(req.body.array);
    Flow.create({ flow_ID: req.body.id, flow_index: req.body.array})
    .then(()=>{
        res.status(201).json("entered successfully");
    })
    .catch((err)=>{
        res.status(500);
        console.log(err);
        res.json(err);
    })
});


module.exports = router;