import {useEffect , useState} from 'react';
import axios from 'axios'

function PrevLeave({selected, onChange}){

    const [accepted, setAccepted] = useState([]);

    const getProfile = async() => {
        try{
            const response = await axios.get('/user/previousLeaveApplication',{withCredentials:true})
            console.log({response})
            if(response.data.success) {
                setAccepted(response.data.accArray)
            }
            
        }
        catch(error) {
            console.log(error)
        }
    }

    
    useEffect(() => {
        getProfile();
    },[])

    return (
    <div className={`mx-auto ${accepted.length === 0 ? "my-8" : "my-8"}`}>
            {accepted.length > 0 && accepted.map((application, index) => (
                <div className="rounded-2xl bg-blue-800 p-6 my-20">
                    <h1 className='bg-blue-300 p-3 mb-6 rounded-lg text-black font-bold text-xl  shadow-[0_1px_10px_2px_rgba(255,255,255,0.5)] text-center'>{application._id}</h1>
                    <div className='flex gap-7 rounded-xl bg-blue-500 p-5'>
                        <h1 className='text-white text-2xl text-center my-auto'>From:</h1>
                        <h1 className='bg-blue-300 rounded-xl px-2 py-3.5 font-bold text-xl text-center'>{new Date(application.leaveStarts).toLocaleDateString("en-IN")}</h1>
                    </div>
                    <div className="flex gap-14 mt-1 mb-4 rounded-xl bg-blue-500 p-5">
                        <h1 className='text-white text-2xl text-center my-auto'>To:</h1>
                        <h1 className='bg-blue-300 rounded-xl px-2 py-3.5 font-bold text-xl text-center'>{new Date(application.leaveEnds).toLocaleDateString("en-IN")}</h1>  
                    </div>

                    <hr className='my-6'/>

                    <table className='border-separate border-spacing-3 mb-4'>
                            <tr>
                                <td className='text-white underline'>Reason:</td>
                                <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold w-full'>{application?.applicationHeader}</td>
                            </tr>
                            <tr>
                                <td className='text-white underline'>Application:</td>
                                <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold w-full'>{application?.applicationBody}</td>
                            </tr>
                    </table>
                </div> 
            ))}

            {accepted.length === 0 && 
                <div className='text-center my-10 border-2 border-blue-800 rounded-2xl pt-20 px-6'>
                        <h1 className='text-5xl text-center font-bold'>So Empty, No Previous Leaves :( </h1>
                        <button className="text-white rounded-xl px-20 py-2 my-20 bg-blue-900 hover:shadow-[0_0px_30px_5px_rgba(255,255,255,0.8)] hover:translate-x-0.5 hover:translate-y-0.5"
                            onClick={() => onChange(1)}
                        >
                            APPLY
                        </button>
                </div>        
            }
            
        </div>
    );
}

export default PrevLeave;