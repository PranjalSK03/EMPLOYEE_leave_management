require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const Employee = require("../models/employee_model.js");
const Credentials = require("../models/employee_cred_model.js");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

var Departments = ["Technical", "HR", "CEO"];

var Position = ["Technical Staff", "HR Staff", "Asst. Head Technical", "Head Technical",
                "Asst. Head HR", "Head HR", "CEO"];


// router.get("/", (req, res)=>{
// });
// router.get("/login", authenticatedRedirect, (req, res)=>{
// });
router.get("/register", authenticatedRedirect, async (req, res)=>{

    try{
        console.log(Departments);
        console.log(Position);

        return res.status(200).send({
            success: true,
            msg: 'Data is here',
            Position,
            Departments
        })
    }
    catch(err){
        return res.status(500).send({
            success:false ,
            msg:'server error'
        })
    }

    
});


router.post("/login", async (req, res)=>{

    const {empId, password} = req.body;

    const emp = await Credentials.findOne({empID : empId});

    if(!emp) return res.status(400).send({
        success:false ,
        msg:'No such user exists.'
    })

    if(await bcrypt.compare(password, emp.Password)){
        const jwtToken = createJWT(emp.empID);
        res.cookie('jwt', jwtToken, {httpOnly : true, maxAge : maxAge * 1000});
        return res.status(200).send({
            success:true ,
            msg:'Login successful',
        })
    }

    return res.status(401).send({
        success:false ,
        msg:'Wrong password',
    })

});

router.post("/register", authenticatedRedirect, async (req, res)=>{
    console.log(req.body);
    console.log(req.body.designation);

    try{

        const {empId, name, department, designation, password} = req.body;

        if(!((department == "Technincal" && (designation == "Technical Staff" || designation == "Asst. Head Technical" || designation == "Head Technical"))
           ||(department == "HR" && (designation == "HR Staff" || designation == "Asst. Head HR" || designation == "Head HR"))
           ||(department == "CEO" && (designation == "CEO")) 
        )){  
            return res.status(200).send({
                success: false,
                msg:"department and designation don't match"
            })
        }
        const isEmployeeThere = await Employee.findOne({empID: empId});
        console.log(isEmployeeThere);
        if(isEmployeeThere){
            if(isEmployeeThere.empID == empId){
                return res.status(400).send({
                    success: false,
                    msg:'ID already exists'
                })
            }
        }

        const impPosition = await Employee.findOne({designation: designation})
        if(impPosition && (impPosition.designation=="Asst. Head Technical" || impPosition.designation=="Asst. Head HR" || impPosition.designation=="Head Technical"|| impPosition.designation=="Head HR" || impPosition.designation=="CEO"))
        {
            console.log("yes here")
            return res.status(400).send({
                success: false,
                msg:'Designation already occupied',
            })
        }
        
        const x = await Employee.create({empID:empId, empName:name, empDept:department, designation:designation});
        const hashedPassword = await bcrypt.hash(password, 14);
        const y = await Credentials.create({empID: empId, Password:hashedPassword})

        console.log(x);
        console.log(y);

        if(!x || !y || !hashedPassword){
            return res.status(500).send({
                success:false ,
                msg:'Error occured',
            })
        }
        else{
            return res.status(200).send({
                success:true ,
                msg:'Registered Successfully',
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success:false ,
            msg:'server side error',
        })
    }
    

});

router.post("/logout", (req, res)=>{
    try{
        res.clearCookie('jwt');
        return res.status(200).send({
            success: true,
            msg: "successfully logout"
        })
    }
    catch{
        return req.status(500).send({
            success: false,
            msg: "server problem while logging out"
        })
    }
    
})

//intermediary function
function authenticatedRedirect(req, res, next){
    const token = req.cookies.jwt;
    // console.log("jwt: ", token);

    if(token == null){
        next();
    }
    else{
        jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
            if(err)
                return res.sendStatus(404);
            req.user = user;
            res.redirect("/user");
        });
    } 
}


const maxAge = 2 * 24 * 60 * 60;
const createJWT = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : maxAge
    })
}

module.exports = router;