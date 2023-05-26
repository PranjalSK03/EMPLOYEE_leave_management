import { NavLink } from "react-router-dom";
import { useEffect , useState} from 'react'
import axios from 'axios'

function Navbar(){

    const [employee , setEmployee]  = useState(null)
    const getUserInfo = async() => {
        try{
          const response = await axios.get('/user', { withCredentials:true})
          console.log('response from backend' , response.data) 
          setEmployee(response?.data.employee)
        }
        catch(err) {
          const error = err.response.data  
          console.log({error})
        }
      }
  
      useEffect(() => {
        getUserInfo() 
      } , [])

    return (
        <nav className="bg-blue-900 text-white flex justify-between py-4 rounded-xl my-2 mx-4 shadow-[0_10px_15px_10px_rgba(0,0,50,0.5)]">
            <div className="my-2">
                <NavLink to = "/" className="py-3 font-bold text-4xl mx-8">Aphelion</NavLink>
            </div>
            <ul className="px-16 py-4 flex space-x-11 justify-end text-lg">
                <NavLink to="/" className="cursor-pointer hover:underline">Home</NavLink>
                {
                    !employee && ( 
                        <div className="flex space-x-11"> 
                            <NavLink to="/login" className="cursor-pointer hover:underline">Login</NavLink>
                            <NavLink to="/register" className="cursor-pointer hover:underline">Register</NavLink>
                        </div>
                    )
                }{
                    employee && (
                        <NavLink to="/dashboard" className="cursor-pointer hover:underline">{employee.empName}</NavLink>
                    )
                }
                 </ul>
        </nav>
    );
}

export default Navbar;