import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
import {useEffect , useState} from 'react';
import axios from 'axios';

function Profile({employee, count, isCEO}){

    useEffect(() => {
        document.body.classList.add('bg-blue-300');
    }, []);
    console.log(count);

    const [noOfEmployee, setNoOfEmployee] = useState(0);
    const [onLeave, setOnLeave] = useState(0);

    const processCeoDetails = async() =>{

        const response = await axios.get("/user/ceoprofile", {withCredentials: true});
        // console.log({response});

        if(response.data.success){

            setNoOfEmployee(response.data.empLength);
            setOnLeave(response.data.leaveLength);

            console.log(noOfEmployee);
            console.log(onLeave);
        }

    }

    useEffect(() => {
        processCeoDetails();
    }, []);



    const percentage = Math.ceil((employee.noOfLeaves/15)*100);
    console.log({employee})

    const leavePercentage = Math.ceil((onLeave/noOfEmployee)*100);

    
    return (
        <>
            {!isCEO && <div className="p-8 font-semibold flex-1 h-screen">
                <h1 className='text-5xl flex gap-3 text-center justify-center'>Welcome, <h1 className='text-blue-600 font-bold hover:underline'>{employee?.empName}</h1></h1>
                <div className="flex gap-10 mt-10 text-center justify-center">
                    <div className="rounded-xl p-5 bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_10px_15px_0px_rgba(0,0,90,0.5)] w-72 hover:shadow-none hover:translate-y-2">
                        <h1 className='text-bold text-2xl rounded-2xl bg-blue-600 p-3 text-white text-center'>Leaves Taken</h1>
                        <p className='mt-4 p-2'>The number of Leaves taken by you are:-</p>
                        <p className='text-center text-white mt-6 text-3xl'>{employee.leavesTaken}</p>
                    </div>
                    <div className="rounded-xl p-5 bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_10px_15px_0px_rgba(0,0,90,0.5)] w-72 hover:shadow-none hover:translate-y-2">
                        <h1 className='text-bold text-2xl rounded-2xl bg-blue-600 p-3 text-white text-center'>Paid Leaves left</h1>
                        <div className='w-20 h-20 mx-auto text-blue-700 pt-4'>
                            <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({ textSize: '25px', textColor: "blue", trailColor: 'rgb(0,0,255,0.2)', pathColor: 'blue'})} />
                        </div>
                        <p className='mt-6 p-2 text-center'>Leaves Left:-  {employee.noOfLeaves}</p>
                        <p className='p-2 text-center'>Total Leaves:- 15</p>
                    </div>
                    <div className="rounded-xl p-5 bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_10px_15px_0px_rgba(0,0,90,0.5)] w-72 hover:shadow-none hover:translate-y-2">
                        <h1 className='text-bold text-2xl rounded-2xl bg-blue-600 p-3 text-white text-center'>Pending Application</h1>
                        <p className='mt-4 p-2'>The no. of the application that you applied are pending </p>
                        <p className='text-center text-white mt-6 text-3xl'>{count}</p>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='mt-8 px-0 py-4 rounded-xl bg-blue-500 shadow-[0_10px_30px_0px_rgba(0,0,80,0.5)] text-white w-5/6 m-auto'>
                        <div className='text-center mb-2'>
                            <h1 className="rounded-xl w-5/6 p-4 bg-blue-800 mx-auto text-2xl"> {employee?.empID}</h1>
                        </div>
                        <div className='flex pl-40'>
                            <h1 className="p-4 w-1/3 my-1 text-center border-2 rounded-lg mr-3"> Department: - </h1>
                            <h1 className="rounded-xl w-1/2 p-4 bg-blue-600 my-1"> {employee?.empDept}</h1>
                        </div>
                        <div className='flex pl-40'>
                            <h1 className="p-4 w-1/3 my-1 text-center border-2 rounded-lg mr-3"> Designation: - </h1>
                            <h1 className="rounded-xl w-1/2 p-4 bg-blue-600 my-1"> {employee?.designation}</h1>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            }

            {isCEO && <div className="p-8 font-semibold flex-1 h-screen">
                <h1 className='text-5xl flex gap-3 text-center justify-center'>Welcome, <h1 className='text-blue-600 font-bold hover:underline'>{employee?.empName}</h1></h1>
                <div className="flex gap-10 mt-10 text-center justify-center">
                    <div className="rounded-xl  px-5 pt-5 py-16  bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_10px_15px_0px_rgba(0,0,90,0.5)] w-72 hover:shadow-none hover:translate-y-2">
                        <h1 className='text-bold text-2xl rounded-2xl bg-blue-600 p-3 text-white text-center'>No. of Employees</h1>
                        <p className='mt-4 p-2'>The total number of employees in your organization:-</p>
                        <p className='text-center text-white mt-6 text-3xl'>{noOfEmployee}</p>
                    </div>
                    <div className="rounded-xl px-5 pt-5 py-16 bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_10px_15px_0px_rgba(0,0,90,0.5)] w-72 hover:shadow-none hover:translate-y-2">
                        <h1 className='text-bold text-2xl rounded-2xl bg-blue-600 p-3 text-white text-center'>People on Leave</h1>
                        <div className='w-20 h-20 mx-auto text-blue-700 pt-4'>
                            <CircularProgressbar value={leavePercentage} text={`${leavePercentage}%`} styles={buildStyles({ textSize: '25px', textColor: "blue", trailColor: 'rgb(0,0,255,0.2)', pathColor: 'blue'})} />
                        </div>
                        <p className='mt-6 p-2 text-center'>On Leave:-  {onLeave}</p>
                    </div>
                    <div className="rounded-xl px-5 pt-5 pb-16  bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_10px_15px_0px_rgba(0,0,90,0.5)] w-72 hover:shadow-none hover:translate-y-2">
                        <h1 className='text-bold text-2xl rounded-2xl bg-blue-600 p-3 text-white text-center'>Active Employees</h1>
                        <p className='mt-4 p-2'>Number of employees that are not on leave and are working:-</p>
                        <p className='text-center text-white mt-6 text-3xl'>{noOfEmployee - onLeave}</p>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='mt-8 px-0 py-4 rounded-xl bg-blue-500 shadow-[0_10px_30px_0px_rgba(0,0,80,0.5)] text-white w-5/6 m-auto'>
                        <div className='text-center mb-2'>
                            <h1 className="rounded-xl w-5/6 p-4 bg-blue-800 mx-auto text-2xl"> {employee?.empID}</h1>
                        </div>
                        <div className='flex pl-40'>
                            <h1 className="p-4 w-1/3 my-1 text-center border-2 rounded-lg mr-3"> Department: - </h1>
                            <h1 className="rounded-xl w-1/2 p-4 bg-blue-600 my-1"> {employee?.empDept}</h1>
                        </div>
                        <div className='flex pl-40'>
                            <h1 className="p-4 w-1/3 my-1 text-center border-2 rounded-lg mr-3"> Designation: - </h1>
                            <h1 className="rounded-xl w-1/2 p-4 bg-blue-600 my-1"> {employee?.designation}</h1>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            }

        </>
         
    );
}

export default Profile;