import {useEffect , useState } from 'react';
import Navbar from "./Navbar"
import loginImg from "../assets/login.svg"
import { NavLink , useNavigate  } from 'react-router-dom';
import axios from 'axios'
function Login(){
    const navigate = useNavigate() 

    useEffect(() => {
        document.body.classList.add('bg-blue-400');
      }, []);
      const [empId , setEmpId] = useState('')
      const [password , setPassword] = useState('')
      const [message , setMessage] = useState(null)

      useEffect(() => {
          document.body.classList.add('bg-blue-400');
        }, []);
    
        const getUserInfo = async() => {
            try{
            const response = await axios.get('/user', { withCredentials:true})
            console.log('response from backend' , response.data);
            if(response?.data.employee)
                navigate('/');
            else
                return;
            }
            catch(err) {
                return;
            }
            

        }

        useEffect(() => {
            getUserInfo() 
        } , [])

      //function to process login data 
      const processLogin = async (e) => {
		e.preventDefault() 
		try{
			const response = await axios.post("/home/login" , {
				empId ,password
			} , { withCredentials:true })

			console.log(response.data) 
			// window.alert(response.data.msg)
            setMessage(null)
            navigate('/dashboard')
		}
		catch(error) {
			const data = error.response.data  
            console.log({data})
            if(!data.success) {
                setMessage(data.msg)
            }
		}
	}

    console.log(message) 

    return (
        <>
            <Navbar/>
            <div className="flex justify-center mt-16 mx-auto bg-blue-600 py-8 w-3/6 rounded-lg position-realtive shadow-[0_10px_30px_0px_rgba(0,0,80,0.5)]">
                <div className="px-10 py-10 bg-gradient-to-r from-blue-200 to-blue-300 text-center rounded-lg ">
                    <form >
                        {message && (
                                <span className='text-red-500 font-semibold'> {message}</span>
                            )}
                        <div>
                        
                            <input name="empId" value={empId} onChange = { (e) => setEmpId(e.target.value)}
                                className="rounded-lg my-2 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                                 type="text"  placeholder="Employee ID" required />
                        </div>
                        <div>
                            
                            <input name="password" value = {password} onChange = { (e) => setPassword(e.target.value)}
                                className="rounded-lg my-2 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                                 type="text"  placeholder="Password" required />
                        </div>
                        <button onClick = {(e) => processLogin(e)}
                         className="text-white rounded-xl px-20 py-2 my-10 bg-blue-900 hover:shadow-[0_5px_20px_0px_rgba(0,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5">LOGIN</button>
                    </form>
                    <hr className="my-6 border-blue-900"/>
                    <p className="mt-8">don't have an account yet? <NavLink to="/register" className="text-blue-600 hover:underline">Register</NavLink></p>
                </div>
                <div className="bg-blue-600 rounded-r-lg px-3 py-28 mx-7 text-center">
                    <h1 className="text-white text-4xl mb-2">LOGIN</h1>
                    <img src={loginImg} alt="" className="w-72 h-40"/>
                </div>
            </div>
        </>
        
    );

}

export default Login