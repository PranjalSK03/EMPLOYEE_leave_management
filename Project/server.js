require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require("mongoose");

//connecting to the database
mongoose.connect(process.env.DB_LINK)
.then(()=>{console.log("connected to DB")})
.catch((err)=>{console.log("error ecountered \n" + err);});


const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(cors({ origin:'http://localhost:3000', credentials: true }))


                        
var Position = ["Technical Staff", "HR Staff", "Asst. Head Technical", "Head Technical","Asst. Head HR", "Head HR", "CEO"];
var Department = ["Technical", "HR", "CEO"];


//server start precomputation
const dailyChange = require("./pre.js");
dailyChange.OnLeaveEntries();
dailyChange.NewYearDelete();


app.get("/", (req, res)=>{
    res.redirect("/home");
});

//home router
const homeRouter = require('./routes/home');
app.use("/home", homeRouter);
//user router
const userRouter = require('./routes/user');
app.use("/user", userRouter);



//listening to port
app.listen(process.env.PORT || 4000, ()=>{
    console.log("server up and running");
})

