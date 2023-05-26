import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsSearch, BsArrowLeft  } from "react-icons/bs";



function Employees({isCEO, employeeDept, empId}){

    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [deptEmployeeDetails, setDeptEmployeeDetails] = useState([]);
    const [deptShow , setDeptShow] = useState(-1);
    const [deptArray, setDeptArray] = useState([]);
    const [singleShow, setSingleShow] = useState(false);
    const [searchedEmp, setSearchedEmp] = useState(null);
    const [query, setQuery] = useState(null);

    console.log(empId);


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
                    setDeptArray(response.data.deptArr);
                }
            }
            
        }
        catch(err){
            console.log(err);
        }
    }

    const processRemove = async(e, id) =>{
        e.preventDefault();
        console.log(id);
        if(!window.confirm("are you sure ? you want to Remove " + id)){
            console.log("you rejected to delete")
            return;   
        }

        try{
            const response = await axios.post("/user/removeemployee", { id }, { withCredentials:true });
            console.log({response});
            if(response.data.success){
                alert("successfully removed employee " + id);
            }
            else{
                alert(id + " could'nt be found")
            }
            processEmployeeDetails();
        }
        catch(err){
            console.log(err);
        }
    }

    const processDeptEmployees = async(deptName)=>{
        try{
            console.log("is CEO", isCEO);
            console.log(employeeDept);

            if(isCEO){
                const response = await axios.get("/user/deptallemployee/" + deptName , { withCredentials:true });
                console.log({response});
                if(response.data.success){
                    setDeptEmployeeDetails(response.data.employees);
                }
            }
            
        }
        catch(err){
            console.log(err);
        }
    }

    const processSingle = async(e) =>{

        e.preventDefault();
        try{
            if(!isCEO){

                for(let i=0; i<deptEmployeeDetails.length ;i++)
                {
                    if(deptEmployeeDetails[i].empID === query){
                        console.log("found dept")
                        setSearchedEmp(deptEmployeeDetails[i]);
                    }
                }
                
            }
            else{
                for(let i=0; i<employeeDetails.length ;i++)
                {
                    if(employeeDetails[i].empID === query){
                        console.log("found emp")
                        setSearchedEmp(employeeDetails[i]);
                    }
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
        <div className='w-1/2 mx-auto'>
            <form className='w-full ml-auto mr-4 flex space-x-9'>
                <div className={`w-full flex items-center rounded-full bg-sky-100 my-8 px-4 py-2 bg-opacity-50`}>
                    <BsSearch className={` text-white text-lg block float-left cursor-pointer`}/>
                    <input type={"search"} placeholder='Employee ID' name='search' autoComplete='off'
                    onChange = { (e) => setQuery(e.target.value)}
                    className={`w-full text-base-lg text-gray-800 font-semibold placeholder-blue-500 bg-transparent focus:outline-none focus:caret-white pl-6 pr-4 py-2`}
                    />
                </div>
                <button 
                onClick = {
                    (e) => {
                        setSearchedEmp(null);
                        setSingleShow(true);
                        processSingle(e);
                    }
                }
                className=" text-white rounded-xl px-10 py-2 my-10 bg-blue-900 hover:shadow-[0_5px_20px_0px_rgba(0,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5">
                    Search
                </button>
            </form>
            {singleShow && searchedEmp &&
                <>
                    <button 
                        onClick = {() => setSingleShow(false)}
                        className=" text-white rounded-xl pr-12 py-2 mt-8 bg-blue-900 hover:shadow-[0_5px_20px_0px_rgba(0,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5 flex gap-3">
                            <BsArrowLeft className='my-1 mx-3 font-semibold '/>
                            Back
                    </button>
                    <div className={`my-12 rounded-3xl pt-2 pb-6 px-6 text-center bg-blue-900 ${empId === searchedEmp.empID ? "hidden" : ""}`}>
                        {console.log(empId === searchedEmp.empID ? "hidden" : ".")}
                        {console.log("here" + empId)}
                        {console.log(searchedEmp?.empID)}
                        <table className='text-xl text-white px-4 my-4 rounded-xl bg-blue-500 w-full border-separate border-spacing-4'>
                            <tr className=''>
                                <td className='rounded-md p-2 text-left border-2 border-white'>Employee ID :</td>
                                <td className='rounded-2xl p-2  bg-blue-300 text-center'>{searchedEmp?.empID}</td> 
                            </tr>
                            <tr className=''>
                                <td className='rounded-md p-2 text-left  border-2 border-white'>Employee Name :</td>
                                <td className='rounded-2xl p-2  bg-blue-300 text-center'>{searchedEmp?.empName}</td> 
                            </tr>
                            <tr className=''>
                                <td className='rounded-md p-2 text-left  border-2 border-white'>Employee Designation :</td>
                                <td className='rounded-2xl p-2  bg-blue-300 text-center'>{searchedEmp?.designation}</td> 
                            </tr>
                            <tr className=''>
                                <td className='rounded-md p-2 text-left  border-2 border-white'>Leaves Taken :</td>
                                <td className='rounded-2xl p-2  bg-blue-300 text-center'>{searchedEmp?.leavesTaken}</td> 
                            </tr>
                            
                        </table>
                        <button className='rounded-full text-white text-2xl bg-red-500 px-6 py-3 w-60 hover:shadow-[0_0px_10px_5px_rgba(255,255,255,0.6)] hover:translate-y-1'
                        onClick={(e) =>{
                            processRemove(e, searchedEmp?.empID);
                        }}>
                            Remove
                        </button>
                    </div>
                </> 
            }
            {singleShow && !searchedEmp &&
                <>
                    <button 
                        onClick = {() => setSingleShow(false)}
                        className=" text-white rounded-xl pr-12 py-2 mt-8 bg-blue-900 hover:shadow-[0_5px_20px_0px_rgba(0,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5 flex gap-3">
                            <BsArrowLeft className='my-1 mx-3 font-semibold '/>
                            Back
                    </button>
                    <h1 className='text-5xl font-bold px-32 py-10  border-2 border-blue-800 p-10 rounded-2xl my-8 text-center'>Finding Someone? !!</h1>
                </>
                
            }
            {!singleShow && !isCEO && deptEmployeeDetails.length > 0 &&
                <div>
                    
                    {deptEmployeeDetails.map((emp, index) => (
                        <div className={`my-12 rounded-3xl pt-2 pb-6 px-6 text-center bg-blue-900 ${empId === emp.empID ? "hidden" : ""}`}>
                            <table className='text-xl text-white px-4 my-4 rounded-xl bg-blue-500 w-full border-separate border-spacing-4'>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left border-2 border-white'>Employee ID :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.empID}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Employee Name :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.empName}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Employee Designation :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.designation}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Leaves Taken :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.leavesTaken}</td> 
                                </tr>
                                
                            </table>
                            <button className='rounded-full text-white text-2xl bg-red-500 px-6 py-3 w-60 hover:shadow-[0_0px_10px_5px_rgba(255,255,255,0.6)] hover:translate-y-1'
                            onClick={(e) =>{
                                processRemove(e, emp?.empID);
                            }}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                
            }
            {!singleShow && !isCEO && deptEmployeeDetails.length === 0 &&
                <div className='my-10 rounded-2xl border-2 border-blue-800 px-8 text-center'>
                    <h1 className='text-5xl font-bold py-8'>Seems like a new Department!</h1>
                </div>
            }

            {!singleShow && isCEO && employeeDetails.length > 0 &&
                <div className='w-full'>
                    <div className='mt-8'>
                        <button className={`${deptShow === -1 ? "bg-blue-900 shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)]" : "bg-blue-500"} px-6 py-3 rounded-full text-white mr-4 mt-4 transition ease-out delay-75 duration-600`} 
                        onClick={ () => {
                            setDeptShow(-1);
                            processEmployeeDetails();
                        }}>
                            Everyone
                        </button>
                        {deptArray.map((entry , idx)=>(
                            <button className={`${deptShow === idx? "bg-blue-900 shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)]" : "bg-blue-500"} px-6 py-3 rounded-full text-white mr-4 transition ease-out delay-75 duration-600`} 
                            onClick={ () => {
                                setDeptShow(idx);
                                processDeptEmployees(entry);
                            }}>
                                {entry}
                            </button>
                        ))}
                    </div> 
                    
                    {deptShow === -1 && employeeDetails.map((emp, index) => (
                        <div className={`my-12 rounded-3xl pt-2 pb-6 px-6 text-center bg-blue-900  ${empId === emp.empID ? "hidden" : ""}`}>
                            <table className='text-xl text-white px-4 my-4 rounded-xl bg-blue-500 w-full border-separate border-spacing-4'>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left border-2 border-white'>Employee ID :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.empID}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Employee Name :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.empName}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Employee Designation :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.designation}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Leaves Taken :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.leavesTaken}</td> 
                                </tr>
                                
                            </table>
                            <button className='rounded-full text-white text-2xl bg-red-500 px-6 py-3 w-60 hover:shadow-[0_0px_10px_5px_rgba(255,255,255,0.6)] hover:translate-y-1'
                            onClick={(e) =>{
                                processRemove(e, emp?.empID);
                            }}>
                                Remove
                            </button>
                        </div>
                    ))}
                    {deptShow > -1 && deptEmployeeDetails.map((emp, index) => (
                        <div className={`my-12 rounded-3xl pt-2 pb-6 px-6 text-center bg-blue-900  ${empId === emp.empID ? "hidden" : ""}`}>
                            <table className='text-xl text-white px-4 my-4 rounded-xl bg-blue-500 w-full border-separate border-spacing-4'>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left border-2 border-white'>Employee ID :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.empID}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Employee Name :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.empName}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Employee Designation :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.designation}</td> 
                                </tr>
                                <tr className=''>
                                    <td className='rounded-md p-2 text-left  border-2 border-white'>Leaves Taken :</td>
                                    <td className='rounded-2xl p-2  bg-blue-300 text-center'>{emp?.leavesTaken}</td> 
                                </tr>
                                
                            </table>
                            <button className='rounded-full text-white text-2xl bg-red-500 px-6 py-3 w-60 hover:shadow-[0_0px_10px_5px_rgba(255,255,255,0.6)] hover:translate-y-1'
                            onClick={(e) =>{
                                processRemove(e, emp?.empID);
                            }}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                
            }
            {!singleShow && isCEO && employeeDetails.length === 0 &&
                <div className='my-10 rounded-2xl border-2 border-blue-800 px-8 text-center'>
                    <h1 className='text-5xl font-bold py-8'>Whoa! seems like you just started this organization</h1>
                </div>
            }
        </div>
    );
}

export default Employees;