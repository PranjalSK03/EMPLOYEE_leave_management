import {useEffect} from 'react';
import Navbar from "./AdminNavbar"
import loginImg from "../assets/login.svg"


function AdminLogin(){

    useEffect(() => {
        document.body.classList.add('bg-purple-400');
      }, []);

    return (
        <>
            <Navbar/>
            <div className="flex justify-center mt-16 mx-auto bg-purple-600 py-8 w-3/6 rounded-lg position-realtive shadow-[0_10px_30px_0px_rgba(90,0,50,0.5)]">
                <div className="px-10 py-10 bg-gradient-to-r from-purple-200 to-purple-400 text-center rounded-lg ">
                    <form method="post">
                        <div>
                            <input className="rounded-lg my-4 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-purple-600 focus:outline-none" type="text" name="empId" placeholder="Employee ID" required />
                        </div>
                        <div>
                            <input className="rounded-lg my-4 px-3 py-2 text-black placeholder-black placeholder-opacity-50 border-2 border-gray-300 focus:border-purple-600 focus:outline-none" type="text" name="password" placeholder="Password" required />
                        </div>
                        <p className="text-purple-600 hover:underline my-4">forgot password?</p>
                        <button name="login" className="text-white rounded-xl px-20 py-2 my-10 bg-purple-900 hover:shadow-[0_5px_20px_0px_rgba(90,0,80,0.6)] hover:translate-x-0.5 hover:translate-y-0.5">LOGIN</button>
                    </form>
                </div>
                <div className="bg-purple-600 rounded-r-lg px-3 py-28 mx-7 text-center">
                    <h1 className="text-white text-4xl mb-2">ADMIN</h1>
                    <img src={loginImg} alt="" className="w-72 h-40"/>
                </div>
            </div>
        </>
        
    );

}

export default AdminLogin