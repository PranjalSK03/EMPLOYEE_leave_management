import { useEffect, useState } from 'react';
import axios from 'axios';


function Employees({isCEO, employeeDept}){

    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [deptEmployeeDetails, setDeptEmployeeDetails] = useState([]);


    const processEmployeeDetails = async() =>{

        try{
            console.log("is CEO", isCEO);
            console.log(employeeDept);

            if(!isCEO){
                console.log("here")
                const response = await axios.get("/user/deptallemployee/" + employeeDept , { withCredentials:true });
                console.log({response});
                if(response.data.success){
                    setDeptEmployeeDetails(response.data.employees);
                }
            }
            else{
                const response = await axios.get("/user/allemployee", { withCredentials:true });
                console.log({response});
                if(response.data.success){
                    setEmployeeDetails(response.data.employees);
                }
            }
            
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        processEmployeeDetails();
    }, []);


    return (
        <div>
            {!isCEO && deptEmployeeDetails.length > 0 &&
                deptEmployeeDetails.map((emp, index) => (
                    <div>
                        <h1>Employee:{emp?.empID}</h1>
                    </div>
                ))
            }
            {!isCEO && deptEmployeeDetails.length === 0 &&
                <div className=''>
                    <h1>Where did all the employees go?</h1>
                </div>
            }
        </div>
    );
}

export default Employees;