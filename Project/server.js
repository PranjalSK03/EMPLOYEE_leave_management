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

const Application = require("./models/application_model.js");
const Employee = require("./models/employee_model.js");
const OnLeave = require("./models/onleave_model.js");
const Department = require("./models/department_model.js");
const Designation = require("./models/designation_model.js");

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(cors({ origin:'http://localhost:3000', credentials: true }))

// app.set("view engine", "ejs");


//from the DB fetch the array and make it.
//                 0                  1               2                   3                         
var Position = ["Technical Staff", "HR Staff", "Asst. Head Technical", "Head Technical",
                "Asst. Head HR", "Head HR", "CEO"];
//                    4           5         6


//daily creating and removing the entries done
async function OnLeaveEntries(){
    const application = await Application.find({applicationStatus : "Accepted"});

    const todayDate = new Date();

    for(let i=0; i<application.length; i++) {

        const sDate = application[i].leaveStarts;
        let date = application[i].leaveEnds;
        date.setDate(date.getDate()+1)
        const eDate = date;

        // console.log(todayDate.getDate(), todayDate.getMonth(), todayDate.getFullYear());
        // console.log(sDate.getDate(), sDate.getMonth(), sDate.getFullYear());
        // console.log(eDate.getDate(), eDate.getMonth(), eDate.getFullYear());
        // console.log(eDate.getFullYear() <= todayDate.getFullYear() && eDate.getMonth() <= todayDate.getMonth() && eDate.getDate() <= todayDate.getDate());
        // console.log(sDate.getFullYear() == todayDate.getFullYear() && sDate.getMonth() == todayDate.getMonth() && sDate.getDate() == todayDate.getDate());
        // console.log("\n")

        if(eDate.getFullYear() <= todayDate.getFullYear() && eDate.getMonth() <= todayDate.getMonth() && eDate.getDate() < todayDate.getDate()){
            console.log(application[i]._id)
            const result = await OnLeave.deleteOne({applID: application[i]._id});
            console.log(result);
            if(result.deletedCount >=1){
                console.log("deleted successfully"); 
            }
        }

        if((sDate.getFullYear() == todayDate.getFullYear() && eDate.getFullYear() >= todayDate.getFullYear())
        && (sDate.getMonth() == todayDate.getMonth() && eDate.getMonth() >= todayDate.getMonth())
        && (sDate.getDate() == todayDate.getDate() && eDate.getDate() >= todayDate.getDate()))
        {
            const employee = await Employee.findOne({empID: application[i].employeeId});
            const onLeave = await OnLeave.find({empID: application[i].employeeId})
            if(onLeave.length === 0){
                const result = await OnLeave.create({
                    empID: employee.empID,
                    department: employee.empDept,
                    applID: application[i]._id,
                    designation: employee.designation,
                    starts: application[i].leaveStarts,
                    ends: application[i].leaveEnds
                })
                console.log(result);
                if(result){
                    console.log("successfully created an entry");
                }
            }
        }

    }
}

OnLeaveEntries();



//to remove application on new year whose end date have expired
async function NewYearDelete(){

    const todayDate = new Date();
    const application = await Application.find({});

    for(let i=0; i<application.length; i++){

        const x = application[i].leaveEnds.getFullYear();

        if(x < todayDate.getFullYear()){
            console.log("ye wali new year pe delete hongi")
            const result = await Application.deleteOne({_id: entries[i]._id});
            if(result){
                console.log("the entry was deleted");
            }
        }
    }
}

NewYearDelete();




app.get("/", (req, res)=>{
    res.redirect("/home");
});

//home router
const homeRouter = require('./routes/home');
app.use("/home", homeRouter);
//admin router
const adminRouter = require('./routes/admin');
app.use("/admin", adminRouter);
//user router
const userRouter = require('./routes/user');
app.use("/user", userRouter);



//listening to port
app.listen(process.env.PORT || 4000, ()=>{
    console.log("server up and running");
})

