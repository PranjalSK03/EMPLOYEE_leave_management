import {useEffect, useState} from 'react';
import Navbar from "./Navbar"
import signupImg from "../assets/signup.svg"
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register(){

    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('bg-blue-400');
    }, []);
      
    const [emp , setEmp] = useState({
    empId:'',name:'',department:'',designation:'',password:''
    })

    const [error, setError] = useState(null);

    const [departments, setDepartment] = useState([]);
    const [designation, setDesignation] = useState([]);


    const handleInputChange = (e) =>{
        const name = e.target.name , value = e.target.value 
        console.log(name,value) 
        setEmp({...emp , [name]:value})
    }

    const getRegister = async() =>{

        try{
            const response = await axios.get('/home/register',{withCredentials:true})
            console.log(response.data);
            if(response.data.success){
                setDepartment(response.data.Departments);
                setDesignation(response.data.Position);   
            }
        }
        catch(err){
            console.log(err);
        }
        
    }

    const processRegister = async(e) => {

        e.preventDefault()
        // console.log({emp})

        if(emp.department === null || emp.department === ""){
            setError("choose a valid department")
            return;
        }
        if(emp.designation === null || emp.designation === ""){
            setError("choose a valid designation")
            return;
        }

        try{
            const response = await axios.post("/home/register", {
                ...emp
            }, {withCredentials: true});


            if(response.data.success === true){
                console.log({response});
                setError(null);
                navigate('/login')
            }
            else{
                console.log("enterd here too");
                setError(response.data.msg)
            }
            
        }
        catch(err){
            console.log({err})
            if(!err.response.data.success){
                setError(err.response.data.msg)
            }
        }
      
    }

    useEffect(() => {
        getRegister()
    }, []);



    return (
        <>
            <Navbar/>
            <div className="flex justify-center mt-12 text-center mx-80 bg-blue-600 py-6 rounded-lg position-relative shadow-[0_10px_30px_0px_rgba(0,0,80,0.5)]">
                <div className="bg-blue-600 rounded-lg px-3 py-28 mx-7 text-center">
                    <h1 className="text-white text-4xl mb-2 pb-2">REGISTER</h1>
                    <img src={signupImg} alt="" className="w-72 h-40"/>
                </div>
                <div className="px-10 pt-3 pb-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg ">
                    <h1 className='py-4 text-red-500 font-semibold'>{error}</h1>
                    <form >
                        <div>
                            <input  onChange = {(e) => handleInputChange(e)}
                                 className="rounded-lg mb-2 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none" 
                                type="text" name="empId" placeholder="Employee ID" required />
                        </div>
                        <div>
                            <input onChange = {(e) => handleInputChange(e)} className="rounded-lg my-2 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                             type="text" name="name" placeholder="Name" required />
                        </div>
                        <div>
                            {/* <input onChange = {(e) => handleInputChange(e)} className="rounded-lg my-2 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                             type="text" name="department" placeholder="Department" required /> */}

                             <select onChange = {(e) => handleInputChange(e)} name="department" className="rounded-lg my-2 pl-4 pr-20 py-2 text-black text-left placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none">
                                <option value={""} className='text-gray-300'>Department</option>
                                {
                                    departments.map((dept, index)=>(
                                        <option value={dept} className='text-left'>{dept}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            {/* <input onChange = {(e) => handleInputChange(e)} className="rounded-lg my-2 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                             type="text" name="designation" placeholder="Designation" required /> */}

                            <select onChange = {(e) => handleInputChange(e)} name="designation" className="rounded-lg my-2 pl-4 pr-6 py-2  text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none">
                                <option value={""}  className='text-gray-300'>Designation</option>
                                {
                                    designation.map((desg, index)=>(
                                        <option value={desg}>{desg}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <input onChange = {(e) => handleInputChange(e)} className="rounded-lg my-2 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                             type="text" name="password" placeholder="Password" required />
                        </div>
                        <button onClick = {(e) => processRegister(e)}
                            className="text-white rounded-xl px-20 py-2 mt-4 bg-blue-900 hover:shadow-[0_5px_20px_0px_rgba(0,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5"
                            >Register</button>
                    </form>
                    <hr className="my-5 border-blue-900"/>
                    <p className="mt-5">already have an account? <NavLink to="/login" className="text-blue-600 hover:underline">Login</NavLink></p>
                </div>
            </div>
        </>
        
    );

}

export default Register;