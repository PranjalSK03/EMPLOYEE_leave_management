import {useState} from 'react'
import axios from 'axios'

function Apply(){

    const [application , setApplication] = useState({
        appHeader:'', startDate:'', endDate:'', appBody:''
    })

    let handleInputChange = (e) =>{
        const name = e.target.name , value = e.target.value 
        console.log(name,value) 
        setApplication({...application , [name]:value})
    }

    const resetForm = (e) => {
        const name = e.target.name; 
        setApplication({...application , [name]:''})
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
              
        }

        catch(err){
            console.log(err.response.data)
            if(!err.response.data.success)
                alert(err.response.data.msg)
        }
    }

    

    return(
        <div className="my-5 mx-auto rounded-xl py-7 px-10 shadow-[0_1px_30px_5px_rgba(0,0,80,0.5)] bg-gradient-to-r from-blue-400 to-blue-500">
            <h1 className="text-4xl text-center font-bold mb-4 p-5 bg-blue-600 text-white rounded-full">Application Form</h1>
            <form action="/user/applyforleave" method="post">
                <div>
                    <p><label className="text-white">Reason for leave: </label></p>
                    <input onChange = {(e) => handleInputChange(e)}
                    name="appHeader" type="text" 
                    className="rounded-lg my-2 px-3 py-2 w-96 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:shadow-[0_1px_20px_0px_rgba(0,0,90,0.5)]" required/>
                </div>
                <div>
                    <p><label className="text-white">Leave Starts: </label></p>
                    <input onChange = {(e) => handleInputChange(e)}
                     name="startDate" type="Date"
                    className="rounded-lg my-2 px-3 py-2 text-black border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:shadow-[0_1px_20px_0px_rgba(0,0,90,0.5)]" required/>
                </div>
                <div>
                    <p><label className="text-white">Leave Ends: </label></p>
                    <input onChange = {(e) => handleInputChange(e)}
                    name="endDate" type="Date" 
                    className="rounded-lg my-2 px-3 py-2 text-black border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:shadow-[0_1px_20px_0px_rgba(0,0,90,0.5)]" required/>
                </div>
                <div>
                    <p className="mb-2"><label className="text-white">Application body: </label></p>
                    <textarea onChange = {(e) => handleInputChange(e)}
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
    );

}

export default Apply;