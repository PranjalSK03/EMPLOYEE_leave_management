require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Application = require("../models/application_model.js");
const Employee = require("../models/employee_model.js");
const Flow = require("../models/flow_model.js");
const OnLeave = require("../models/onleave_model.js");
const Credentials = require("../models/employee_cred_model.js");
const Designation = require("../models/designation_model.js");
const Departments = require("../models/department_model.js");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.set("view engine", "ejs");
                       
var Position = ["Technical Staff", "HR Staff", "Asst. Head Technical", "Head Technical", "Asst. Head HR", "Head HR", "CEO"];
var Department = ["Technical", "HR", "CEO"];

const dailyChange = require("../pre.js");

//GET
router.get("/", authenticateToken, async(req, res)=>{
    try{
        const application = await Application.find({employeeId: req.user.id, applicationStatus: "Pending"})
        const applicationCount = application.length;
        var isCeo = false;

        let employee = await Employee.findOne({empID:req.user.id})

        let options = -1;
        if(employee.designation == "Asst. Head HR" || employee.designation == "Asst. Head Technical" || employee.designation == "HR Staff")
        {
            options = 1;
        }
        else if(employee.designation == "Head HR" || employee.designation == "Head Technical"){
            options = 2;
        }
        else if(employee.designation == "CEO" ){
            isCeo = true;
            options = 3;
        }
        else{
            options = 4;
        }

        if(!employee) return res.status(400).send({
            success:false ,
            msg:'There was an error! Please try again later.'
        })

        // console.log(employee);

        let applicationToVerify ;
        for(let i=0; i<Position.length; i++){
            if(employee.designation == Position[i]){
                applicationToVerify = await Application.find({'locationOfAppl.level': i});
                console.log(applicationToVerify);
            }
        }

        const lenAppToVerify = applicationToVerify.length

        return res.status(200).send({
            success:true,
            msg:'successfully fetched employee data.',
            employee,
            applicationCount,
            options,
            lenAppToVerify,
            isCeo
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).send({
            success:false,
            msg:'An error occured! Please try again later.'
        })
    }

});

router.get("/application", authenticateToken, async (req, res)=>{

    try{
        const employee = await Employee.findOne({empID: req.user.id});
        // console.log({employee})
        if(employee.designation == "CEO"){
            return res.status(404).send({
                success:false,
                msg:'you are not authorized'
            })
        }

        for(let i=0; i<Position.length ; i++){
            if(employee.designation == Position[i]){
                const applications = await Application.find({employeeId: employee.empID});
                if(applications.length === 0){
                    return res.status(200).send({
                        success:true ,
                        msg:'You have no application to be viewed',
                        applications
                    })  
                }
                else{
                    return res.status(200).send({
                        success: true,
                        msg: 'Application fetched successfully',
                        applications
                    })
                }
            }
        }
    }
    catch(err){
        res.status(500).send({
            success: false,
            msg: 'An error occured! Please try again later.'
        })
    }
});

router.get("/judgeapplication", authenticateToken, async (req, res)=>{
    console.log(req.user);

    try{
        const employee = await Employee.findOne({empID: req.user.id});
        if(employee.designation == "Technical Staff"){
            return res.status(404).send({
                success:false,
                msg:'you are not authorized'
            })
        }

        for(let i=0; i<Position.length; i++){
            if(employee.designation == Position[i]){
                const applications = await Application.find({'locationOfAppl.level': i});
                // console.log(applications);
                if(applications.length === 0){
                    return res.status(200).send({
                        success:true ,
                        msg:'You have no application to be reviewed',
                        applications
                    })  
                }
                else{
                    return res.status(200).send({
                        success: true,
                        msg: 'Application fetched successfully',
                        applications
                    })
                }
            }
        }
    }
    catch(err){
        res.status(500).send({
            success: false,
            msg: 'An error occured! Please try again later.'
        })
    }

    
});

router.get("/onleave", authenticateToken, async (req, res)=>{
    //console.log(req.user);
    dailyChange.OnLeaveEntries();
    dailyChange.NewYearDelete();

    try{
        const employee = await Employee.findOne({empID: req.user.id});
        const empDept = employee.empDept;
        const desgn = employee.designation;

        var choiceDeptList = 0; //choice whether to see department list or not 

        const deptOnLeave = await OnLeave.find({department: empDept});

        if(desgn == "Asst. Head Technical" || desgn == "Head Technical")
        {
            choiceDeptList = 1;
            const onLeave = [];
            console.log("1 -->" , onLeave);
            console.log("1 -->" , deptOnLeave);
            console.log("1 -->", choiceDeptList);
            return res.status(200).send({
                success: true,
                msg: "list of the people in department on leave",
                onLeave,
                deptOnLeave,
                choiceDeptList
            })
        }
        else if(desgn == "Head HR" || desgn == "Asst. Head HR"){

            choiceDeptList = 2;
            const onLeave = await OnLeave.find({});
            console.log("2 -->" , onLeave);
            console.log("2 -->" , deptOnLeave);
            return res.status(200).send({
                success: true,
                msg: "list of the pepople on leave",
                onLeave,
                deptOnLeave,
                choiceDeptList
            })
        }
        else if(desgn== "CEO"  || desgn == "HR Staff"){

            choiceDeptList = 3;
            const onLeave = await OnLeave.find({});
            console.log("3 -->" , onLeave);
            console.log("3 -->" , deptOnLeave);
            return res.status(200).send({
                success: true,
                msg: "list of the pepople on leave",
                onLeave,
                deptOnLeave,
                choiceDeptList
            })
        }
        else{
            return res.status(404).send({
                success: false,
                msg: "you are not authorized"
            })
        }
    }
    catch(err){
        res.status(500).send({
            success: false,
            msg: 'An error occured! Please try again later.'
        }) 
    }
    

})

router.get("/previouLeavesApplication", authenticateToken, async (req,res)=>{

    try{
        const accApplications = await Application.find({appID : req.user.id, applicationStatus : "Accepted"});

        function requiredApplication(x){

            let arr = [];

            for(let i=0; i<x.length; i++) {
                const eDate = x[i].leaveEnds;
                const todayDate = new Date();

                if(eDate.getFullYear() <= todayDate.getFullYear() && eDate.getMonth() <= todayDate.getMonth() && eDate.getDate() < todayDate.getDate()){
                    arr.push(x[i]);
                }  
            }

            return arr;
        }

        const accArray = requiredApplication(accApplications);

        console.log(accArray);

        return res.status(200).send({
            success: true,
            msg: 'here is the required array',
            accArray
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            msg: 'An error on server side occured'
        });
    }
    
})

router.get("/allemployee", authenticateToken, async(req, res)=>{
    try{
        const employees = await Employee.find({});
        // const department = await Department.find({});

        const deptArr = [];

        for(let i=0; i<Department.length; i++){
            if(Department[i]!= 'CEO')
            deptArr.push(Department[i]);
        }

        return res.status(200).send({
            success: true,
            msg: "here is the employee details",
            employees,
            deptArr
        })
    }
    catch(err){
        return res.status(500).send({
            success: false,
            msg: "server error !!"
        })
    }
})

router.get("/deptallemployee/:dept", authenticateToken, async (req, res)=>{
    try{
        const employees = await Employee.find({empDept: req.params.dept});

        return res.status(200).send({
            success: true,
            msg: "here is the employee details",
            employees
        })
    }
    catch(err){
        return res.status(500).send({
            success: false,
            msg: "server error !!"
        })
    }
})

router.get("/ceoprofile", authenticateToken, async (req, res)=>{

    dailyChange.OnLeaveEntries();
    dailyChange.NewYearDelete();

    try{
        const Employees = await Employee.find({})
        const Onleave = await OnLeave.distinct('empID');
        console.log(Onleave);


        const empLength = Employees.length - 1 ;
        const leaveLength = Onleave.length;

        console.log(leaveLength);


        return res.status(200).send({
            success: true,
            msg: "the data for CEO profile",
            empLength,
            leaveLength
        })
    }
    catch(err){
        return res.status(500).send({
            success: false,
            msg: "server error !!"
        })
    }
})







//POST
router.post("/applyforleave", authenticateToken, async (req, res)=>{
    console.log(req.body);
    // locationOfAppl: timestampApplication: are decided here
    console.log(req.user);

    const {appHeader, startDate, endDate, appBody} = req.body;
    
    const sDate = new Date(startDate);
    console.log(sDate);
    const eDate = new Date(endDate)

    const todayDate = new Date();

    var isApplThere = false;

    if(sDate.getFullYear() < todayDate.getFullYear() || sDate.getMonth() < todayDate.getMonth() || sDate.getDate() < todayDate.getDate())
    {
        return res.status(200).send({
            success: false,
            msg: "leave starting date is a past date, choose a future or current date",
            todayDate,
            isApplThere
        })
    }
    if(eDate.getFullYear() < todayDate.getFullYear() || eDate.getMonth() < todayDate.getMonth() || eDate.getDate() < todayDate.getDate())
    {
        return res.status(200).send({
            success: false,
            msg: "leave ending date is a past date, choose a future or current date",
            todayDate,
            isApplThere
        })
    }

    const alreadyThereAppl = await Application.find({employeeId : req.user.id});
    for(let i=0; i<alreadyThereAppl.length ;i++){
        if(alreadyThereAppl[i].leaveStarts <= sDate && alreadyThereAppl[i].leaveEnds >= sDate){
            console.log("already: " ,alreadyThereAppl[i]);
            const alreadyThere = alreadyThereAppl[i];
            isApplThere = true;
            return res.status(200).send({
                success: false,
                msg: "you already have a leave application for that day",
                alreadyThere,
                isApplThere
                
            })
        }
    }
    

    try{
        const employee =  await Employee.findOne({empID: req.user.id});
        if(employee.designation == "CEO"){
            return res.status(404).send({
                success: false,
                msg: "you are not authorized",
            })
        }
        for(let i=0; i<Position.length; i++){
            if(employee.designation == Position[i]){
                const result = await Flow.findOne({flow_ID: i});
                const levelInfo = result.flow_index[1];  
                const appl = new Application({
                    employeeId: req.user.id,
                    applicationHeader: appHeader,
                    leaveStarts: new Date(startDate),
                    leaveEnds: new Date(endDate),
                    applicationBody: appBody,
                    locationOfAppl:{
                        flowType: i,
                        level: levelInfo,
                        levelName: Position[levelInfo],
                        index: 1
                    },
                    timestampApplication: Date.now(),
                })

                const output = await appl.save();

                if(output){
                    return res.status(200).send({
                        success: true,
                        msg: "Application submitted successfully",

                    })
                }

                if(!output){
                    return res.status(500).send({
                        success: false,
                        msg: "error in sumbitting form"
                    })
                }

            }
        }
    
    }
    catch(err){
        return res.status(500).send({
            success: false,
            msg: "server error !! retry"
        }) 
    }

});

router.post("/judgeapplication", authenticateToken, async (req, res)=>{
    // console.log(req.user);
    //to create division basis on post
    // console.log(req.body);

    try{
        const employee = await Employee.findOne({empID: req.user.id});
        if(!employee){
            console.log("no such person !!! check jwt");
            return res.status(500)
            .send({
                success: false,
                msg: "you are not correct person"
            })
        }

        const application = await Application.findOne({_id: req.body.applId});
        let remarksArray = application.Remarks;
        remarksArray.push(employee.designation + ": " + req.body.remarks);

        if(!req.body.status){
            return res.send({
                success: true,
                msg:"error in the body you sent"
            });
        }

        let a = application.locationOfAppl.flowType;
        let c = application.locationOfAppl.index;
        // let b = application.locationOfAppl.level;
        // console.log(a + " " + b + " " + c);

        const flow = await Flow.findOne({flow_ID: a})
        const sizeOfArray = flow.flow_index.length;
        // console.log(sizeOfArray);

        if(req.body.status == "accept"){
            const result = flow;
            console.log(result);

            if(c < sizeOfArray-1) {
                c++;
                const index = result.flow_index[c];
                console.log(index);
                console.log(c + " " + Position[index]);

                timestampArray = application.timestampForward;
                timestampArray.push(Date.now());

                //update locationOfAppl: , timestampForward, remarks
                const filter = {_id: req.body.applId};
                const update = {
                    $set:{
                        Remarks: remarksArray,
                        timestampForward: timestampArray,
                        "locationOfAppl.level": result.flow_index[c],
                        "locationOfAppl.index": c,
                        "locationOfAppl.levelName" : Position[result.flow_index[c]]
                    }
                }

                const endRes = await Application.updateOne(filter, update);
                console.log("here is the output :",endRes);
                if(endRes.modifiedCount >= 1){
                    return res.status(200)
                    .send({
                        success: true,
                        msg:"Accepted and forwared application id = " + application._id + " to : "
                    });
                }
                else{
                    return res.status(500)
                    .send({
                        success: false,
                        msg:"server side error"
                    });
                }
                
            }

            else if(c == sizeOfArray-1){
                //update locationOfAppl: , timestampAccept/reject, remarks, status
                const filter = {_id: req.body.applId};
                const update = {
                    $set:{
                        Remarks: remarksArray,
                        timestampAccOrRej: Date.now(),
                        applicationStatus: "Accepted",
                        "locationOfAppl.levelName" : employee.designation,
                        "locationOfAppl.level": -1,
                        "locationOfAppl.index": -1
                    }
                }
                const result = await Application.updateOne(filter, update);

                //if leaves confirmed then updating the database
                const entry = await Employee.findOne({empID: application.employeeId});
                let paidHoliday = entry.noOfLeaves;
                let totalLeaves = entry.leavesTaken;

                const noOfDays = ((application.leaveEnds - application.leaveStarts)/86400000) + 1;

                totalLeaves += noOfDays;
                if(noOfDays <= paidHoliday){
                    paidHoliday -= noOfDays;
                }
                else{
                    paidHoliday = 0;
                }

                console.log("Leaves left: ", noOfDays);
                console.log("Paid Leaves updated: ", paidHoliday);
                console.log("totalLeaves updated: ", totalLeaves);

                const output = await Employee.updateOne({empID: application.employeeId}, {$set:{noOfLeaves: paidHoliday, leavesTaken: totalLeaves}})
                consoele.log(output);

                return res.status(200)
                .send({
                    success: true,
                    msg:"Accepted application id = " + entry._id
                });
            }
            else{
                return res.status(500)
                .send({
                    success: false,
                    msg: "there was error on Database side!!! Data Inconsistency"
                })
            }  
        }

        else{
            //update locationOfAppl: , timestampAccept/reject, remarks, status
            const filter = {_id: req.body.applId};
            const update = {
            $set:{
                Remarks: remarksArray,
                timestampAccOrRej: Date.now(),
                applicationStatus: "Rejected",
                "locationOfAppl.levelName" : employee.designation,
                "locationOfAppl.level": -1,
                "locationOfAppl.index": -1
                }
            }
            const result = await Application.updateOne(filter, update);

            if(result.modifiedCount > 1){
                return res.status(200)
                .send({
                    success: true,
                    msg: "you rejected the message"
                })
            }
            else{
                return res.status(500)
                .send({
                    success: false,
                    msg:"server side error"
                });
            }

        }

    }
    catch(err){
        return res.status(500).send({
            success: false,
            msg: "server error !! retry"
        })
    }
    
});

router.post("/requiredapplication", authenticateToken, async (req, res)=>{

    try{
        const application = await Application.findOne({_id: req.body.query, employeeId: req.user.id});
        console.log(application)

        if(!application){
            return res.status(200).send({
                success: false,
                msg: "can't find such application"
            })
        }

        else{
            return res.status(200).send({
                success: true,
                msg: "here is the required application",
                application
            })
        }
        
    }
    catch(err){
        return res.status(500).send({
            success: false,
            msg: "server error !!"
        })
    }
    
})

router.post("/employeedetails", authenticateToken, async (req, res)=>{
    try{
        const employee = await Employee.findOne({empID: req.body.query});

        if(!employee){
            return res.status(200).send({
                success: false,
                msg: "no such employee"
            })
        }
        else{
            return res.status(200).send({
                success: true,
                msg: "here is the employee details",
                employee
            })
        }
    }
    catch(err){
        return res.status(500).send({
            success: false,
            msg: "server error !!"
        })
    }
})

router.post("/removeemployee", async(req, res)=>{

    console.log(req.body.id);

    try{
        const removedEmployee = await Employee.deleteOne({empID: req.body.id});
        const removedEmployeeCred = await Credentials.deleteOne({empID: req.body.id});
    
        console.log(removedEmployee);
        console.log(removedEmployeeCred);
    
        if(removedEmployee.deletedCount >=1 && removedEmployeeCred.deletedCount >=1){
            res.status(200).send({
                success: true,
                msg: "successfully removed!!"
            })
        }
        else{
            res.status(200).send({
                success: false,
                msg: "some error!!"
            }) 
        }
    }
    catch(err){
        return res.status(500).send({
            success: false,
            msg: "server error !!"
        })
    }


})






// intermediate functions
function authenticateToken(req, res, next){
    // console.log(req.cookies);
    const token = req.cookies.jwt;
    // console.log("jwt: ", token);

    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}




module.exports = router;