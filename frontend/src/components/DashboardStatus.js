import { useState, useEffect } from 'react'
import axios from 'axios'
import { IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";
import { BsSearch, BsArrowLeft } from "react-icons/bs";
import { HiClock } from "react-icons/hi2";

function Status({select, onChange}){

    const [applicationData , setApplicationData] = useState([]);
    const [singleShow, setSingleShow] = useState(false);
    const [singleApplication, setSingleApplication] = useState(null);

    const [query, setQuery] = useState(null);

    const getApplication = async() => {
        try{
            const response = await axios.get('/user/application',{withCredentials:true})
            console.log(response.data)
            if(response.data.success) {
                setApplicationData(response.data.applications);
                console.log({applicationData});
            }
            
        }
        catch(error) {
            console.log({error})
        }
    }

    const processSingle = async(e) =>{
        e.preventDefault();
        const response = await axios.post("/user/requiredapplication",{
            query
        }, { withCredentials:true });

        console.log({response});

        if(response.data.success){
            setSingleShow(true);
            console.log(response.data.application);
            setSingleApplication(response.data.application);
            console.log(singleApplication);
        }
        else{
            setSingleShow(true);
            console.log(response.data.msg) 
        }
    }

    useEffect(() => {
        getApplication() 
    },[])


    return(
        <div className="flex flex-col mx-auto my-4">
            <form className='w-full ml-auto mr-4 pl-6 flex space-x-9'>
                <div className={`w-full flex items-center rounded-full bg-sky-100 my-8 px-4 py-2 bg-opacity-50`}>
                    <BsSearch className={` text-white text-lg block float-left cursor-pointer`}/>
                    <input type={"search"} placeholder='Application ID' name='search' autoComplete='off'
                    onChange = { (e) => setQuery(e.target.value)}
                    className={`w-full text-base-lg text-gray-800 font-semibold placeholder-blue-500 bg-transparent focus:outline-none focus:caret-white pl-6 pr-4 py-2`}
                    />
                </div>
                <button 
                onClick = {
                    (e) => {
                        setSingleShow(true);
                        processSingle(e);
                    }
                }
                className=" text-white rounded-xl px-10 py-2 my-10 bg-blue-900 hover:shadow-[0_5px_20px_0px_rgba(0,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5">
                    Search
                </button>
            </form>
            {!singleShow && applicationData.length > 0 && applicationData.slice(0).reverse().map((application, index) => (
                <div key={index} className="mx-auto my-7 max-w-4xl bg-blue-400 rounded-3xl p-3 flex contenet-center transition shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)] hover:scale-105 hover:shadow-[0_1px_30px_5px_rgba(0,0,80,0.7)] hover:duration-500 hover:delay-300 ease-out">
                    <div className="mr-3 py-16 rounded-3xl p-auto px-4 bg-blue-800 ">
                        <div className='flex gap-7 rounded-xl bg-blue-500 p-5'>
                            <h1 className='text-white text-2xl text-center'>Leave Starts:</h1>
                            <h1 className='bg-blue-300 rounded-xl px-2 py-3.5 font-bold text-xl text-center'>{new Date(application.leaveStarts).toLocaleDateString("en-IN")}</h1>
                        </div>
                        <div className="flex gap-7 my-6  rounded-xl bg-blue-500 p-5">
                            <h1 className='text-white text-2xl text-center'>Leave Ends:</h1>
                            <h1 className='bg-blue-300 rounded-xl px-2 py-3.5 font-bold text-xl text-center'>{new Date(application.leaveEnds).toLocaleDateString("en-IN")}</h1>  
                        </div>
                    </div>
                    <div className="my-3 rounded-3xl p-5 bg-gradient-to-r text-white from-blue-700 to-blue-500 ">
                        <h1 className='bg-blue-300 p-3 mb-3 rounded-lg text-black font-bold text-xl  shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)]'>{application._id}</h1>

                        <table className='border-separate border-spacing-3 mb-4'>
                            <tr>
                                <td>Reason:</td>
                                <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{application?.applicationHeader}</td>
                            </tr>
                            <tr>
                                <td>Application:</td>
                                <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{application?.applicationBody}</td>
                            </tr>
                            <tr>
                                <td>with whom:</td>
                                <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{application?.locationOfAppl.levelName}</td>
                            </tr>
                            <tr>
                                <td>Applied on:</td>
                                <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{new Date(application?.timestampApplication).toLocaleDateString("en-IN")}</td>
                            </tr>
                        </table>

                        <h1 className='mb-3'>Track your Application: </h1>

                        <div className='rounded-2xl bg-blue-400 py-2'>
                            {application.timestampForward?.map((timeStamp , idx) => (
                                <div className='mx-8 my-4 bg-blue-700 p-4 rounded-2xl'>
                                    <h1 className='bg-blue-400 p-3 rounded-2xl mb-2'>{new Date(timeStamp).toLocaleString("en-IN")}</h1>
                                    <h1 className={``}>{application.Remarks[idx]}</h1>
                                </div>
                            ))}
                            <div className={`mx-8 my-4 bg-blue-700 p-4 rounded-2xl ${ (application.applicationStatus === "Rejected" || application.applicationStatus === "Accepted") ? "" : "hidden" }`}>
                                {/* {console.log(application.timestampAccOrRej)} */}
                                <h1 className={`bg-blue-400 p-3 rounded-2xl  mb-2`}>{new Date(application.timestampAccOrRej).toLocaleString("en-IN")}</h1>
                                <h1 className={``}>{application.Remarks[application.Remarks.length-1]}</h1>
                            </div>   
                        </div>
                    </div>
                    <div className="ml-3 my-3 rounded-2xl p-5 text-white bg-blue-800">
                        <h1 className='text-3xl font-bold'>Status</h1>
                        <div className='bg-blue-200 rounded-xl'>
                            <h1 
                                className={`my-12 text-3xl text-center p-6 
                                ${application.applicationStatus === "Rejected" ? "text-red-600" : application.applicationStatus === "Accepted" ? "text-green-800" : "text-yellow-600"}`}>{application.applicationStatus === "Rejected" ? <IoCloseCircle/> : application.applicationStatus === "Accepted" ? <IoCheckmarkCircle/> : <HiClock/>}
                            </h1>
                        </div>
                    </div>
                    
                </div>
            ))}

            {!singleShow && applicationData.length === 0 && 
                <div className='my-10 rounded-2xl border-2 border-blue-800 pt-12 px-8 text-center'>
                    <h1 className='text-5xl font-bold'>You have not applied for Leave yet!</h1>
                    <button className="text-white rounded-xl px-20 py-2 my-20 bg-blue-900 hover:shadow-[0_0px_30px_5px_rgba(255,255,255,0.8)] hover:translate-x-0.5 hover:translate-y-0.5"
                        onClick={() => onChange(1)}
                    >
                        APPLY
                    </button>
                </div>
            }

            { singleShow && singleApplication &&

                <>
                    <button 
                        onClick = {() => setSingleShow(false)}
                        className=" text-white rounded-xl w-1/4 px-3 py-2 mt-8 bg-blue-900 hover:shadow-[0_5px_20px_0px_rgba(0,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5 flex gap-3">
                            <BsArrowLeft className='my-1 mx-3 font-semibold '/>
                            All Applications
                    </button>
                    <div className="mx-auto my-7 max-w-4xl bg-blue-400 rounded-3xl p-3 flex content-center transition shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)] hover:scale-105 hover:shadow-[0_1px_30px_5px_rgba(0,0,80,0.7)] hover:duration-500 hover:delay-300 ease-out">
                        
                        <div className="mr-3 py-16 rounded-3xl p-auto px-4 bg-blue-800 ">
                            <div className='flex gap-7 rounded-xl bg-blue-500 p-5'>
                                <h1 className='text-white text-2xl text-center'>Leave Starts:</h1>
                                <h1 className='bg-blue-300 rounded-xl px-2 py-3.5 font-bold text-xl text-center'>{new Date(singleApplication?.leaveStarts).toLocaleDateString("en-IN")}</h1>
                            </div>
                            <div className="flex gap-7 my-6  rounded-xl bg-blue-500 p-5">
                                <h1 className='text-white text-2xl text-center'>Leave Ends:</h1>
                                <h1 className='bg-blue-300 rounded-xl px-2 py-3.5 font-bold text-xl text-center'>{new Date(singleApplication?.leaveEnds).toLocaleDateString("en-IN")}</h1>  
                            </div>
                        </div>
                        <div className="my-3 rounded-3xl p-5 bg-gradient-to-r text-white from-blue-700 to-blue-500 ">
                            <h1 className='bg-blue-300 p-3 mb-3 rounded-lg text-black font-bold text-xl  shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)]'>{singleApplication?._id}</h1>

                            <table className='border-separate border-spacing-3 mb-4'>
                                <tr>
                                    <td>Reason:</td>
                                    <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{singleApplication?.applicationHeader}</td>
                                </tr>
                                <tr>
                                    <td>Application:</td>
                                    <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{singleApplication?.applicationBody}</td>
                                </tr>
                                <tr>
                                    <td>with whom:</td>
                                    <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{singleApplication?.locationOfAppl.levelName}</td>
                                </tr>
                                <tr>
                                    <td>Applied on:</td>
                                    <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{new Date(singleApplication?.timestampApplication).toLocaleDateString("en-IN")}</td>
                                </tr>
                            </table>

                            <h1 className='mb-3'>Track your Application: </h1>

                            <div className='rounded-2xl bg-blue-400 py-2'>
                                {singleApplication?.timestampForward?.map((timeStamp , idx) => (
                                    <div className='mx-8 my-4 bg-blue-700 p-4 rounded-2xl'>
                                        <h1 className='bg-blue-400 p-3 rounded-2xl mb-2'>{new Date(timeStamp).toLocaleString("en-IN")}</h1>
                                        <h1 className={``}>{singleApplication?.Remarks[idx]}</h1>
                                    </div>
                                ))}
                                <div className={`mx-8 my-4 bg-blue-700 p-4 rounded-2xl ${ (singleApplication?.applicationStatus === "Rejected" || singleApplication?.applicationStatus === "Accepted") ? "" : "hidden" }`}>
                                    {/* {console.log(application.timestampAccOrRej)} */}
                                    <h1 className={`bg-blue-400 p-3 rounded-2xl  mb-2`}>{new Date(singleApplication?.timestampAccOrRej).toLocaleString("en-IN")}</h1>
                                    <h1 className={``}>{singleApplication?.Remarks[singleApplication?.Remarks.length-1]}</h1>
                                </div>   
                            </div>
                        </div>
                        <div className="ml-3 my-3 rounded-2xl p-5 text-white bg-blue-800">
                            <h1 className='text-3xl font-bold'>Status</h1>
                            <div className='bg-blue-200 rounded-xl'>
                                <h1 
                                    className={`my-12 text-3xl text-center p-6 
                                    ${singleApplication?.applicationStatus === "Rejected" ? "text-red-600" : singleApplication?.applicationStatus === "Accepted" ? "text-green-800" : "text-yellow-600"}`}>{singleApplication?.applicationStatus === "Rejected" ? <IoCloseCircle/> : singleApplication?.applicationStatus === "Accepted" ? <IoCheckmarkCircle/> : <HiClock/>}
                                </h1>
                            </div>
                        </div>
                        
                    </div>
                </>
            }

            { singleShow && !singleApplication &&
                <div className='my-10'>
                    <h1 className='text-5xl font-bold'>No such application could be found out !!</h1>
                </div>
            }
        
        </div>
    );

}

export default Status;