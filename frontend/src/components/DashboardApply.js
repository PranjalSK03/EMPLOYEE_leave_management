import {useState} from 'react'
import axios from 'axios'
import { BiLeftArrow } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
function Apply(){

    const [application , setApplication] = useState({
        appHeader:'', startDate:'', endDate:'', appBody:''
    })

    let today = new Date();
    
    const [error, setError] = useState(null);
    const [date, setDate] = useState(null);
    const [isAppl, setIsAppl] = useState(false);
    const [alreadyAppl, setAlreadyAppl] = useState(null);
    const [tDate] = useState(today.getFullYear() + "-" + (today.getMonth() <= 9 ? ("0" + (today.getMonth()+1)) : (today.getMonth()+1))+ "-" + (today.getDate() <= 9 ? ("0"+(today.getDate())) : today.getDate()));
    console.log(tDate);

    let handleInputChange = (e) =>{
        const name = e.target.name , value = e.target.value 
        console.log(name,value) 
        setApplication({...application , [name]:value})
    }

    const resetForm = (e) => {
        e.target.value = null;
    }

    const processApply = async(e) => {
        e.preventDefault()
        console.log({application})
        try{
            const response = await axios.post("/user/applyforleave", {
                ...application
            }, {withCredentials: true});

            console.log(response);

            if(response.data.success){
                alert(response.data.msg)
                console.log({application})
                
            }
            else{
                setError(response.data.msg);
                setIsAppl(response.data.isApplThere);
                if(response.data.isApplThere){
                    setAlreadyAppl(response.data.alreadyThere)
                }
                else
                    setDate(response.data.todayDate);
            }
              
        }

        catch(err){
            console.log(err.response.data)
            if(!err.response.data.success){
                alert(err.response.data.msg);
            }

        }
    }
    

    return(
        <div className={`m-auto h-full ${error === null ? "" : "flex justify-center gap-4"}`}>
            <div className={`my-8 ${error !== null ? "" : "m-auto"} h-full rounded-xl py-7 px-10 shadow-[0_1px_30px_5px_rgba(0,0,80,0.5)] bg-gradient-to-r from-blue-400 to-blue-500 transition duration-500`}>
                <h1 className="text-4xl text-center font-bold mb-4 p-5 bg-blue-600 text-white rounded-full">Application Form</h1>
                <form >
                    <div>
                        <p><label className="text-white">Reason for leave: </label></p>
                        <input onChange = {(e) => {
                            setError(null);
                            handleInputChange(e)
                        }}
                        name="appHeader" type="text" 
                        className="rounded-lg my-2 px-3 py-2 w-96 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:shadow-[0_1px_20px_0px_rgba(0,0,90,0.5)]" required/>
                    </div>
                    <div>
                        <p><label className="text-white">Leave Starts: </label></p>
                        <input onChange = {(e) => {
                            setError(null);
                            handleInputChange(e)
                        }}
                        name="startDate" type="Date" min={tDate}
                        className="rounded-lg my-2 px-3 py-2 text-black border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:shadow-[0_1px_20px_0px_rgba(0,0,90,0.5)]" required/>
                    </div>
                    <div>
                        <p><label className="text-white">Leave Ends: </label></p>
                        <input onChange = {(e) => {
                            setError(null);
                            handleInputChange(e)
                        }}
                        name="endDate" type="Date" min={tDate}
                        className="rounded-lg my-2 px-3 py-2 text-black border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:shadow-[0_1px_20px_0px_rgba(0,0,90,0.5)]" required/>
                    </div>
                    <div>
                        <p className="mb-2"><label className="text-white">Application body: </label></p>
                        <textarea onChange = {(e) => {
                            setError(null);
                            handleInputChange(e)
                        }}
                        className="rounded-xl px-3 py-2 focus:outline-blue-600 focus:border-none focus:shadow-[0_1px_20px_0px_rgba(0,0,90,0.5)]"
                        name="appBody" rows="5" cols="60"></textarea>
                    </div>
                    <button onClick = {(e) => {
                        processApply(e)
                        resetForm(e);
                    }}
                    className="text-white rounded-xl px-20 py-2 mt-6 font-semibold bg-blue-900 hover:shadow-[0_5px_20px_0px_rgba(0,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5"
                    >SUBMIT</button>
                    
                </form>
            </div>
            {error && 
            <div className='my-auto w-1/3 flex '>
                <BiLeftArrow className='my-auto text-8xl text-red-600 animate-bounce'/>
                <div className='rounded-2xl bg-red-600 px-2 pb-6 pt-2 mr-6 shadow-[0_0px_15px_2px_rgba(0,0,0,0.3)]'>
                    <IoCloseCircleOutline className='ml-auto text-2xl text-white hover:scale-125 cursor-pointer' onClick={() => setError(null)}/>
                    <h1 className='text-center text-3xl font-bold text-white pb-3 flex justify-center  mx-3'>ERROR<CgDanger className='pt-2'/></h1>
                    <h1 className=' text-red-600 bg-white rounded-xl text-lg p-4 mb-4 font-semibold  mx-3'>{error}</h1>
                    <div className='border-2 rounded-xl p-4 mx-3'>
                        <h1 className='text-xl font-semibold text-white underline'>NOTE:</h1>
                        {isAppl && 
                            <div className='border-2 rounded-lg my-3 p-2'>
                               <h1 className='text-white'>Application ID:- </h1>
                               <h1 className='font-bold'>{alreadyAppl._id}</h1>
                            </div>
                        }
                        <div className='flex gap-3 my-2'>
                            {isAppl ? <h1> Leave Ends on:- </h1> : <h1>Today's Date is :- </h1> }
                            {isAppl ? <h1 className='text-blue-900 font-semibold hover:underline'>{new Date(alreadyAppl.leaveEnds).toLocaleDateString("en-IN")}</h1> : <h1 className='text-blue-900 font-semibold hover:underline'>{new Date(date).toLocaleDateString("en-IN")}</h1>}
                        </div>
                        {isAppl && <h1 className='text-white'>So choose a date after above date !</h1>}
                    </div>
                </div>
            </div>
            }
        </div>
    );

}

export default Apply;