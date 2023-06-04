import { useState , useEffect} from 'react';
import {MdExpandCircleDown} from "react-icons/md"
import axios from 'axios'

function ViewApp(){

    const [applicationData , setApplicationData] = useState([]);
    const [status , setStatus] = useState('');
    const [remarks , setRemarks] = useState('');
    const [dropDownIndex, setDropDownIndex] = useState(-1);
    
    const getApplication = async() => {
        try{
            const response = await axios.get('/user/judgeapplication',{withCredentials:true})
            // console.log(response.data)
            if(response.data.success) {
                setApplicationData(response.data.applications);
                console.log({applicationData});
            }
            
        }
        catch(error) {
            console.log({error})
        }
    }


    const postApplication= async(e, index) =>{
        e.preventDefault();
        try{
            console.log(status);
            console.log(remarks);
            console.log(applicationData[index]._id)
            const response = await axios.post('/user/judgeapplication',{
                remarks, applId: applicationData[index]._id, status
            },{withCredentials:true})

            console.log(response.data.msg)
            console.log(response.data)
            console.log(response.data.success);
            if(response.data.success) {
                alert(response.data.msg);
                getApplication();
            }
            
        }
        catch(error) {
            console.log({error});
        }
    }

    useEffect(() => {
        getApplication();
    },[])

    return (
        <div className="mx-auto">
            {applicationData.length === 0 && <h1 className='text-5xl my-16 font-bold border-2 border-blue-800 p-10 rounded-2xl'>Wooho! no application to review</h1>}
            {applicationData.map((application, index)=> (

                <div className="bg-blue-400 rounded-3xl mt-6 pb-6 px-8 pt-2 text-center duration-700 ">
                <MdExpandCircleDown className={`m-3 text-4xl text-white ${(index === dropDownIndex) && "rotate-180"} `}
                 onClick={()=> {
                    if(dropDownIndex === index)
                        setDropDownIndex(-1);
                    else
                        setDropDownIndex(index);
                }}/>
                <div className=" bg-blue-500 rounded-lg p-3 shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)] transition hover:scale-105 hover:shadow-[0_1px_30px_5px_rgba(0,0,80,0.7)] hover:duration-500 ease-out">

                    <h1 className="p-5 m-3 rounded-2xl text-3xl font-semibold bg-blue-900 text-white text-center"
                     >Leave ID:  {application._id}
                    </h1>
                    
                    <div className="">
                        <div className={`m-3 rounded-2xl p-5 text-white bg-blue-700 duration-700 delay-500 flex justify-evenly`}>
                            <h1 className='text-2xl mt-2'>From:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'> {new Date(application.leaveStarts).toLocaleDateString("en-IN")}</h1>
                            <h1 className='text-2xl mt-2 ml-6'>To:</h1><h1 className='rounded-2xl bg-white text-black px-6 py-3 font-bold'> {new Date(application.leaveEnds).toLocaleDateString("en-IN")}</h1>  
                        </div>
                        <div className={`m-3 rounded-3xl p-5 bg-blue-400 text-white text-left ${(index !== dropDownIndex) && "hidden"} duration-700 delay-500`}>
                            <table className='w-full border-separate border-spacing-2'>
                                <tr>
                                    <td className='text-center w-1/3 border-2 rounded-lg'>Applicant ID:</td>
                                    <td className='bg-blue-700 px-6 py-2 rounded-full'>{application.employeeId}</td>
                                </tr>
                                <tr>
                                    <td className='text-center w-1/3 border-2 rounded-lg'>Leave Title:</td>
                                    <td className='bg-blue-700 px-6 py-2 rounded-full'>{application.applicationHeader}</td>
                                </tr>
                                <tr>
                                    <td className='text-center w-1/3 border-2 rounded-lg'>Application:</td>
                                    <td className='bg-blue-700 px-6 py-2 rounded-full'>{application.applicationBody}</td>
                                </tr>
                                <tr>
                                    <td className='text-center w-1/3 border-2 rounded-lg'>Applied on:</td>
                                    <td className='bg-blue-700 px-6 py-2 rounded-full'>{new Date(application.timestampApplication).toLocaleDateString("en-IN")}</td>
                                </tr>
                            </table>
                            <div className=''>
                                <h1 className='text-center w-2/3 bg-blue-600 py-3 rounded-full mx-auto mt-6 mb-3'>Application History: </h1>
                                {application.timestampForward?.map((timeStamp , idx) => (
                                    <div className='flex gap-6 mx-20 my-2'>
                                        <h1>{new Date(timeStamp).toLocaleString("en-IN")}</h1>
                                        <h1>{application.Remarks[idx]}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <form className={`mt-6 `} onSubmit={(e)=>postApplication(e,index)}>
                    <div>
                        <input name="applId" type="hidden" value={application._id}/>
                    </div>
                    <div className={`flex flex-col ${(index !== dropDownIndex) && "hidden"}`}>
                        <label className="text-xl text-center mb-2 text-white">Remarks : </label>
                        <textarea onChange = { (e) => setRemarks(e.target.value)}
                        className="rounded-xl px-3 py-2 focus:outline-blue-600 focus:border-none focus:shadow-[0_1px_20px_0px_rgba(0,0,90,0.5)]" name="remarks" rows="4" cols="10"
                        ></textarea>
                    </div>
                    <div className="mx-auto my-4">
                        <button onClick = {(e) => {
                            setStatus(e.target.value);
                            }}
                        className="h-12 mr-2 w-28 bg-blue-900 rounded-2xl px-3 py-2 font-semibold text-white hover:translate-x-1 hover:translate-y-1 hover:duration-150 transition ease-out"  name="status" value="accept">Accept</button>
                        <button onClick = {(e) => {
                            setStatus(e.target.value);
                            }}
                        className="h-12 mx-2 w-28 border-2 border-blue-900 rounded-2xl px-3 py-2 text-blue-900 hover:bg-blue-900 hover:text-white font-semibold hover:translate-x-1 hover:translate-y-1 hover:duration-150 transition ease-out" name="status" value="reject">Reject</button>
                    </div>
                </form>
                </div>

            ))}

            
        </div>
    );
}

export default ViewApp;