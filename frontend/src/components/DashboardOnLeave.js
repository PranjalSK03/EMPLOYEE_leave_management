import { useState, useEffect } from 'react';
import { BsFillArrowDownCircleFill } from "react-icons/bs"
import axios from 'axios'

function OnLeave(){

    const [deptLeaveData, setDeptLeaveData] = useState([]);
    const [leaveData, setLeaveData] = useState([]);
    const [choice, setChoice] = useState(0);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isDeptEmpty, setIsDeptEmpty] = useState(false);

    const [idx, setIdx] = useState(-1);
    const [deptShow, setDeptShow] = useState(false);

    const getApplication = async() => {
        try{
            const response = await axios.get('/user/onleave',{withCredentials:true});
            console.log(response.data)
            if(response.data.success) {
                setDeptLeaveData(response.data.deptOnLeave);
                setLeaveData(response.data.onLeave);
                setChoice(response.data.choiceDeptList);

                if(response.data.deptOnLeave.length === 0){
                    setIsDeptEmpty(true);
                }
                if(response.data.onLeave.length === 0){
                    setIsEmpty(true);
                }
            }
            
        }
        catch(error) {
            console.log({error})
        }
    }

    useEffect(() => {
        getApplication();
    },[])

    return(
        <div className="mx-auto my-8 inline-block w-1/2">
            {choice === 2 &&
                <div className=''>
                    <hr className='mb-4'/>
                    <button className={`${!deptShow ? "bg-blue-900 shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)]" : "bg-blue-500"} px-6 py-3 rounded-full text-white mr-4 transition ease-out delay-75 duration-600`} onClick={ () => setDeptShow(!deptShow)}>Everyone</button>
                    <button className={`${deptShow ? "bg-blue-900 shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)]" : "bg-blue-500"} px-6 py-3 rounded-full text-white mr-4  transition ease-out delay-75 duration-600`} onClick={ () => setDeptShow(!deptShow)}>Department</button>
                    <hr className='mb-8 mt-4'/>
                </div> 
           }
            {choice === 2 && !deptShow && leaveData.map((people, index)=>(
                <div>
                    {isEmpty && <h1 className='text-5xl font-bold px-60 py-10  border-2 border-blue-800 p-10 rounded-2xl'>Looks like No Ones On Leave !!</h1>}
                    {!isEmpty && 
                        <div className="bg-gradient-to-r from-blue-500 to-blue-400 px-2 rounded-3xl py-5 my-5 transition duration-300 hover:shadow-[0_1px_20px_10px_rgba(0,0,80,0.5)] hover:translate-x-2">
                            <h1 className="text-white mx-3 my-3 bg-blue-900 p-4 rounded-3xl text-center flex justify-center">
                                <p>Employee ID: {people.empID}</p>
                                <BsFillArrowDownCircleFill className={`text-white text-xl mb-1 mx-5 ${idx === index && "rotate-180"} `} 
                                onClick={()=> {
                                    if(index === idx)
                                        setIdx(-1);
                                    else
                                        setIdx(index)}
                                }/>
                            </h1>
                            <div className={`m-3 rounded-2xl p-5 text-white bg-blue-700 duration-700 delay-500 flex justify-evenly`}>
                                <h1 className='text-2xl mt-2 mr-3'>From:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'>{new Date(people.starts).toLocaleDateString("en-IN")}</h1>
                                <h1 className='text-2xl mt-2 ml-12 mr-3'>To:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'>{new Date(people.ends).toLocaleDateString("en-IN")}</h1>  
                            </div>
                            <div className={`${idx !== index && "hidden"} m-2`}>
                                <div className='flex'>
                                    <h1 className='text-white border-2 rounded-lg m-3 p-3 w-1/3 text-center mx-auto'>Designation: </h1>
                                    <h1 className={`m-3 rounded-2xl bg-white px-6 py-3 w-1/2 font-semibold`}>{people.designation}</h1>
                                </div>
                                <div className='flex'>
                                    <h1 className='text-white border-2 rounded-lg m-3 p-3 w-1/3 text-center mx-auto'>Department: </h1>
                                    <h1 className={`m-3 rounded-2xl bg-white px-6 py-3 w-1/2 font-semibold`}>{people.department}</h1>
                                </div>
                            </div>
                        </div>}
                </div>
                
            ))}
            {choice === 2 && !deptShow && leaveData.length === 0 &&
                <div className='my-10 rounded-2xl border-2 border-blue-800 py-12 px-8 text-center'>
                    <h1 className='text-5xl font-bold'>Company is quite active, No one is on Leave</h1>
                </div>
            }
            {choice === 2 && deptShow && deptLeaveData.map((people, index)=>(
                <div>
                    {isDeptEmpty && <h1 className='text-5xl font-bold px-60 py-10  border-2 border-blue-800 p-10 rounded-2xl'>Looks like No Ones On Leave !!</h1>}
                    {!isDeptEmpty && <div className="bg-gradient-to-r from-blue-500 to-blue-400 px-2 rounded-3xl py-5 my-5 transition duration-300 hover:shadow-[0_1px_20px_10px_rgba(0,0,80,0.5)] hover:translate-x-2">
                        <h1 className="text-white mx-3 my-3 bg-blue-900 p-4 rounded-3xl text-center flex justify-center">
                            <p>Employee ID: {people.empID}</p>
                            <BsFillArrowDownCircleFill className={`text-white text-xl mb-1 mx-5 ${idx === index && "rotate-180"} `} 
                            onClick={()=> {
                                if(index === idx)
                                    setIdx(-1);
                                else
                                    setIdx(index)}
                            }/>
                        </h1>
                        <div className={`m-3 rounded-2xl p-5 text-white bg-blue-700 duration-700 delay-500 flex justify-evenly`}>
                            <h1 className='text-2xl mt-2 mr-3'>From:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'>{new Date(people.starts).toLocaleDateString("en-IN")}</h1>
                            <h1 className='text-2xl mt-2 ml-12 mr-3'>To:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'>{new Date(people.ends).toLocaleDateString("en-IN")}</h1>  
                        </div>
                        <div className={`flex ${idx !== index && "hidden"}`}>
                            <h1 className='text-white border-2 rounded-lg m-3 p-3 w-1/3 text-center mx-auto'>Designation: </h1>
                            <h1 className={`m-3 rounded-2xl bg-white px-6 py-3 w-1/2 font-semibold`}>{people.designation}</h1>
                        </div>
                    </div>}
                </div>
                
            ))}
            {choice === 2 && deptShow && deptLeaveData.length === 0 &&
                <div className='my-10 rounded-2xl border-2 border-blue-800 py-12 px-8 text-center'>
                    <h1 className='text-5xl font-bold'>Your Department is quite active, no one is on leave</h1>
                </div>
            }
            {choice === 1 && deptLeaveData.map((people, index)=>(
                <div>
                    {isDeptEmpty && <h1 className='text-5xl font-bold px-60 py-10  border-2 border-blue-800 p-10 rounded-2xl'>Looks like No Ones On Leave !!</h1>}
                    {!isDeptEmpty && <div className="bg-gradient-to-r from-blue-500 to-blue-400 px-2 rounded-3xl py-5 my-5 transition duration-300 hover:shadow-[0_1px_20px_10px_rgba(0,0,80,0.5)] hover:translate-x-2">
                        <h1 className="text-white mx-3 my-3 bg-blue-900 p-4 rounded-3xl text-center flex justify-center">
                            <p>Employee ID: {people.empID}</p>
                            <BsFillArrowDownCircleFill className={`text-white text-xl mb-1 mx-5 ${idx === index && "rotate-180"} `} 
                            onClick={()=> {
                                if(index === idx)
                                    setIdx(-1);
                                else
                                    setIdx(index)}
                            }/>
                        </h1>
                        <div className={`m-3 rounded-2xl p-5 text-white bg-blue-700 duration-700 delay-500 flex justify-evenly`}>
                            <h1 className='text-2xl mt-2 mr-3'>From:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'>{new Date(people.starts).toLocaleDateString("en-IN")}</h1>
                            <h1 className='text-2xl mt-2 ml-12 mr-3'>To:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'>{new Date(people.ends).toLocaleDateString("en-IN")}</h1>  
                        </div>
                        <div className={`flex ${idx !== index && "hidden"}`}>
                            <h1 className='text-white border-2 rounded-lg m-3 p-3 w-1/3 text-center mx-auto'>Designation: </h1>
                            <h1 className={`m-3 rounded-2xl bg-white px-6 py-3 w-1/2 font-semibold`}>{people.designation}</h1>
                        </div>
                    </div>}
                </div>
            ))}
            {choice === 1 && deptLeaveData.length === 0 &&
                <div className='my-10 rounded-2xl border-2 border-blue-800 py-12 px-8 text-center mx-auto'>
                    <h1 className='text-5xl font-bold'>Looks like no one is on leave</h1>
                </div>
            }
            {choice === 3 && leaveData.map((people, index)=>(
                <div>
                    {isEmpty && <h1 className='text-5xl font-bold px-60 py-10  border-2 border-blue-800 p-10 rounded-2xl'>Looks like No Ones On Leave !!</h1>}
                    {!isEmpty && <div className="bg-gradient-to-r from-blue-500 to-blue-400 px-2 rounded-3xl py-5 my-5 transition duration-300 hover:shadow-[0_1px_20px_10px_rgba(0,0,80,0.5)] hover:translate-x-2">
                        <h1 className="text-white mx-3 my-3 bg-blue-900 p-4 rounded-3xl text-center flex justify-center">
                            <p>Employee ID: {people.empID}</p>
                            <BsFillArrowDownCircleFill className={`text-white text-xl mb-1 mx-5 ${idx === index && "rotate-180"} `} 
                            onClick={()=> {
                                if(index === idx)
                                    setIdx(-1);
                                else
                                    setIdx(index)}
                            }/>
                        </h1>
                        <div className={`m-3 rounded-2xl p-5 text-white bg-blue-700 duration-700 delay-500 flex justify-evenly`}>
                            <h1 className='text-2xl mt-2 mr-3'>From:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'>{new Date(people.starts).toLocaleDateString("en-IN")}</h1>
                            <h1 className='text-2xl mt-2 ml-12 mr-3'>To:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'>{new Date(people.ends).toLocaleDateString("en-IN")}</h1>  
                        </div>
                        <div className={`flex ${idx !== index && "hidden"}`}>
                            <h1 className='text-white border-2 rounded-lg m-3 p-3 w-1/3 text-center mx-auto'>Designation: </h1>
                            <h1 className={`m-3 rounded-2xl bg-white px-6 py-3 w-1/2 font-semibold`}>{people.designation}</h1>
                        </div>
                    </div>}
                </div>
            ))}
            {choice === 3 && leaveData.length === 0 &&
                <div className='my-10 rounded-2xl border-2 border-blue-800 py-12 px-8 text-center mx-auto'>
                    <h1 className='text-5xl font-bold'>Looks like no ones on leave</h1>
                </div>
            }
        </div>
    );
}

export default OnLeave;

