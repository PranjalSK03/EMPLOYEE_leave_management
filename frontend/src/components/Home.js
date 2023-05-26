import welcome from "../assets/welcome.svg"
import {NavLink } from 'react-router-dom'
import Navbar from "./Navbar"
import {useEffect , useState} from 'react';
import axios from 'axios'

function Home() {

  const [employee , setEmployee] = useState(null)

  useEffect(() => {
      document.body.classList.add('bg-blue-400');
    }, []);

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
    <>
      <Navbar/>
      <main>
          <div className="main my-12 mx-16 rounded-xl bg-gradient-to-r from-blue-200 to-blue-300 py-28 px-10 flex justify-around shadow-[0_20px_70px_10px_rgba(0,0,20,0.4)]">
              <div>
                  <p className="text-5xl font-semibold mb-2">
                      Hello There, Welcome to Aphelion
                  </p>
                  <p className="py-4 w-3/4">
                      Aphelion is Web Application which aims to solve the problem of Employee Leave Management for a company.
                      It is a Web Application Devloped in regard to a University Project. It is a static system and the functionality may change from one 
                      organization to other, through this Web Application a employee can register, login, apply for a leave, see the application status
                      etc. , on the other hand there are some head figures who are capable to accept or reject such application.
                  </p>
                  { !employee && (
                    <div className="my-4 text-white flex gap-6">
                      <NavLink to = "/register" 
                        className="px-6 py-2 bg-blue-900 rounded-2xl font-semibold text-white hover:translate-x-1 hover:translate-y-1 hover:duration-150 transition ease-out  hover:shadow-[0_5px_30px_3px_rgba(0,0,100,0.4)]"
                          >Register</NavLink>
                      <NavLink to="/login"
                        className="px-6 py-2 border-2 border-blue-900 rounded-2xl text-blue-900 hover:bg-blue-900 hover:text-white font-semibold hover:translate-x-1 hover:translate-y-1 hover:duration-150 transition ease-out  hover:shadow-[0_5px_30px_3px_rgba(0,0,100,0.4)]">
                        Login
                      </NavLink>
                  </div> ) 
                  }
                  {
                    employee && (
                      <div className="my-4 text-white flex">
                        <NavLink to = "/dashboard" 
                        className="px-6 py-2 bg-blue-900 rounded-2xl font-semibold text-white hover:translate-x-1 hover:translate-y-1 hover:duration-150 transition ease-out hover:shadow-[0_5px_30px_3px_rgba(0,0,100,0.4)]"
                          >Dashboard
                        </NavLink>
                      </div>
                      
                    )
                  }

                  
              </div>
              <div className="flex items-center">
                  <img src={welcome} alt="" srcset=""/>
              </div>
          </div>
      </main>
    </>
  );
}

export default Home;
