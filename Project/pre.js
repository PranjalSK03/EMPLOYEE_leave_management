

const Application = require("./models/application_model.js");
const Employee = require("./models/employee_model.js");
const OnLeave = require("./models/onleave_model.js");

var Position = ["Technical Staff", "HR Staff", "Asst. Head Technical", "Head Technical","Asst. Head HR", "Head HR", "CEO"];


async function OnLeaveEntries(){
    const application = await Application.find({applicationStatus : "Accepted"});

    const todayDate = new Date();

    for(let i=0; i<application.length; i++) {

        const sDate = application[i].leaveStarts;
        const eDate = application[i].leaveEnds;

        // console.log("start Date:", sDate);
        // console.log("end Date:", eDate);
        // console.log("today Date:", todayDate)

        // console.log(todayDate.getDate(), todayDate.getMonth(), todayDate.getFullYear());
        // console.log(sDate.getDate(), sDate.getMonth(), sDate.getFullYear());
        // console.log(eDate.getDate(), eDate.getMonth(), eDate.getFullYear());
        // console.log(eDate.getFullYear() <= todayDate.getFullYear() && eDate.getMonth() <= todayDate.getMonth() && eDate.getDate() <= todayDate.getDate());
        // console.log(sDate.getFullYear() == todayDate.getFullYear() && sDate.getMonth() == todayDate.getMonth() && sDate.getDate() == todayDate.getDate());
        // console.log("\n")

        if(eDate.getFullYear() < todayDate.getFullYear() ||
          ((eDate.getFullYear() == todayDate.getFullYear())&&(eDate.getMonth() < todayDate.getMonth())) ||
          ((eDate.getFullYear() == todayDate.getFullYear())&&(eDate.getMonth() == todayDate.getMonth())&&(eDate.getDate() < todayDate.getDate()))){
            console.log(application[i]._id)
            const result = await OnLeave.deleteOne({applID: application[i]._id});
            console.log(result);
            if(result.deletedCount >= 1){
                console.log("deleted successfully"); 
            }
        }


        if((sDate.getFullYear() <= todayDate.getFullYear() && eDate.getFullYear() >= todayDate.getFullYear())
        && (sDate.getMonth() <= todayDate.getMonth() && eDate.getMonth() >= todayDate.getMonth())
        && (sDate.getDate() <= todayDate.getDate() && eDate.getDate() >= todayDate.getDate()))
        {
            const employee = await Employee.findOne({empID: application[i].employeeId});
            const onLeave = await OnLeave.find({applID: application[i]._id})
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



module.exports = {
    OnLeaveEntries: OnLeaveEntries,
    NewYearDelete: NewYearDelete
}