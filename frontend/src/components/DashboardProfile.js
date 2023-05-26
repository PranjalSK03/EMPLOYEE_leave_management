import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";

function Profile({employee, count}){

    console.log(count);

    const percentage = (employee.noOfLeaves/15)*100;
    console.log({employee})
    
    return (
        <div className="p-8 font-semibold flex-1 h-screen">
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
                <div className='mt-8 p-4 rounded-xl bg-blue-500 shadow-[0_10px_30px_0px_rgba(0,0,80,0.5)] text-white'>
                    <h1 className="rounded-xl p-4 bg-blue-600 my-3">Employee ID: - {employee?.empID}</h1>
                    <h1 className="rounded-xl p-4 bg-blue-600 my-3">Department: - {employee?.empDept}</h1>
                    <h1 className="rounded-xl p-4 bg-blue-600 my-3">Designation: - {employee?.designation}</h1>

                </div>
            </div> 
    );
}

export default Profile;