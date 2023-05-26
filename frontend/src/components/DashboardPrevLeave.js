import {useEffect , useState} from 'react';
import axios from 'axios'

function PrevLeave({selected, onChange}){

    const [accepted, setAccepted] = useState([]);

    const getProfile = async() => {
        try{
            const response = await axios.get('/user/previousLeaves',{withCredentials:true})
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
    <div className={`${accepted.length === 0 ? "mx-auto my-8" : "mx-6 my-8"}`}>
            {accepted.length > 0 && accepted.map((application, index) => (
                <div className="rouned-2xl bg-blue-800 ">
                    <h1 className='bg-blue-300 p-3 mb-3 rounded-lg text-black font-bold text-xl  shadow-[0_1px_15px_5px_rgba(0,0,80,0.5)]'>{application._id}</h1>
                    <div className='flex gap-7 rounded-xl bg-blue-500 p-5'>
                        <h1 className='text-white text-2xl text-center'>From:</h1>
                        <h1 className='bg-blue-300 rounded-xl px-2 py-3.5 font-bold text-xl text-center'>{new Date(application.leaveStarts).toLocaleDateString("en-IN")}</h1>
                    </div>
                    <div className="flex gap-7 my-6  rounded-xl bg-blue-500 p-5">
                        <h1 className='text-white text-2xl text-center'>To:</h1>
                        <h1 className='bg-blue-300 rounded-xl px-2 py-3.5 font-bold text-xl text-center'>{new Date(application.leaveEnds).toLocaleDateString("en-IN")}</h1>  
                    </div>

                    <table className='border-separate border-spacing-3 mb-4'>
                            <tr>
                                <td>Reason:</td>
                                <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{application?.applicationHeader}</td>
                            </tr>
                            <tr>
                                <td>Application:</td>
                                <td className='bg-blue-400 rounded-xl px-6 py-2 text-white font-semibold'>{application?.applicationBody}</td>
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