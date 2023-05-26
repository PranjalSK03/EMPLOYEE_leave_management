import { useState } from 'react';
import { BsArrowLeftShort, BsSearch, BsFillCalendarCheckFill } from "react-icons/bs";
import { AiFillFileExclamation } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { IoDocumentText, IoAddCircle, IoPeopleSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { HiUser } from "react-icons/hi";
import { GiPalmTree } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr"
import axios from 'axios';
import { useNavigate , NavLink  } from 'react-router-dom';

function Sidebar({selected, onChange, option, length}){
    const navigate = useNavigate();

    console.log("the options: ", {option});
    console.log("the length: ", {length});

    const [open, setOpen] = useState(true);
    const [empDetails, setEmpDetails] = useState(null);
    const [isEntry, setIsEntry] = useState(false);
    const [query, setQuery] = useState(null)

    let Menu = []

    if(option === 1){
        Menu =[
            {title: "Profile", icon: <HiUser/>},
            {title: "Apply", icon: <IoAddCircle/>},
            {title: "Status", icon: <AiFillFileExclamation/>},
            {title: "Previous Leaves", icon: <BsFillCalendarCheckFill/>},
            {title: "Applications", icon: <IoDocumentText/>},
            {title: "On Leave", icon: <GiPalmTree/>},
        ];
    }
    else if(option === 2){
        Menu =[
            {title: "Profile", icon: <HiUser/>},
            {title: "Apply", icon: <IoAddCircle/>},
            {title: "Status", icon: <AiFillFileExclamation/>},
            {title: "Previous Leaves", icon: <BsFillCalendarCheckFill/>},
            {title: "Applications", icon: <IoDocumentText/>},
            {title: "On Leave", icon: <GiPalmTree/>},
            {title: "Department Employees", icon: <IoPeopleSharp/>}
        ];
    }
    else if(option === 3){
        Menu =[
            {title: "Profile", icon: <HiUser/>},
            {title: "Applications", icon: <IoDocumentText/>},
            {title: "On Leave", icon: <GiPalmTree/>},
            {title: "Employees", icon: <IoPeopleSharp/>}
        ];
    }
    else if(option === 4){
        Menu =[
            {title: "Profile", icon: <HiUser/>},
            {title: "Apply", icon: <IoAddCircle/>},
            {title: "Status", icon: <AiFillFileExclamation/>},
            {title: "Previous Leaves", icon: <BsFillCalendarCheckFill/>}
        ];
    }
    else{
        Menu =[];
    }

    const processLogout = async (e) => {
		e.preventDefault() 
		try{
			const response = await axios.post("/home/logout" , {} , { withCredentials:true })

			console.log(response.data) 
			window.alert(response.data.msg)
            navigate('/login')
		}
		catch(error) {
			const data = error.response.data  
            console.log({data})
		}
	}

    const processGetID = async(e) =>{
        e.preventDefault();

        try{
            const response = await axios.post("/user/employeedetails", { query }, { withCredentials:true });
            console.log({response});
            if(response.data.success){
                setEmpDetails(response.data.employee);
                setIsEntry(true);
                console.log(empDetails);
            }
            else{
                setEmpDetails(null);
                setIsEntry(true);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    
    

    return (
        <div className={`bg-blue-900 h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-500 rounded-r-xl sticky top-0`}>
            <BsArrowLeftShort className={`bg-white text-dark-blue-900 text-2xl font-black rounded-full absolute -right-3 top-9 border border-blue-900 curson-pointer ${!open && "rotate-180"}`}
                onClick={()=> setOpen(!open)}/>
            <div className='inline-flex'>
            {/* <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-4 duration-300 ${!open && "rotate-[360deg]"}`}/> */}
                <NavLink to = "/" className={`text-white font-medium text-4xl origin-left ${!open && "scale-0"}`}>Aphelion</NavLink>
            </div>
            {!isEntry && <form className={`mt-6 flex ${!open && "hidden"} gap-2`}>
                <div className={`flex items-center rounded-xl bg-sky-100 bg-opacity-25 px-3`}>
                    <BsSearch className={` text-white text-lg block float-left cursor-pointer mr-4`}/>
                    <input type={"search"} placeholder='Employee ID' name='query' autoComplete='on'
                    onChange = { (e) => setQuery(e.target.value)}
                    className={`w-full text-base-lg text-blue-200 placeholder-gray-300 bg-transparent focus:outline-none focus:caret-white py-2`}
                    />
                </div>
                <button 
                    onClick = {
                        (e) => {
                            processGetID(e);
                        }
                    }
                    className={` text-blue-300 rounded-xl px-6 py-2 bg-transparent border-2 border-blue-300 hover:shadow-[0_0px_10px_5px_rgba(255,255,255,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-blue-300 hover:text-blue-900 hover:font-semibold`}>
                        Go
                </button>
                
            </form>
            }

            { isEntry && empDetails &&
                <div className={` backdrop-blur-xl mt-6 shadow-[0_0px_10px_5px_rgba(255,255,255,0.6)] rounded-2xl bg-sky-100 bg-opacity-25 p-3 ${!open ? "hidden" : ""}`} >
                    <GrFormClose className='ml-auto text-white bg-white rounded-full mb-2' 
                    onClick={() =>{
                        setIsEntry(false);
                        setEmpDetails(null);
                    }}/>
                    <div>
                        <h1 className='text-black font-semibold bg-gray-300 rounded py-0.5 px-2 my-1'>Name: {empDetails?.empName}</h1>
                        <h1 className='text-black font-semibold bg-gray-300 rounded py-0.5 px-2 my-1'>Department: {empDetails?.empDept}</h1>
                        <h1 className='text-black font-semibold bg-gray-300 rounded py-0.5 px-2 my-1'>Designation: {empDetails?.designation}</h1>
                    </div>
                </div>
            }

            

            { isEntry && empDetails === null &&
                <div className={`rounded-2xl bg-sky-100 bg-opacity-25 p-3 mt-4 ${!open ? "hidden" : ""} `} >
                    <GrFormClose className='ml-auto text-white bg-white rounded-full mb-2' 
                    onClick={() =>{
                        setIsEntry(false);
                        setEmpDetails(null);
                    }}/>
                    <div>
                        <h1 className='text-white  text-center px-2 my-1'>No such Employee!</h1>
                    </div>
                </div>
            }
            
            <ul className={`pt-4 ${!open ? "mt-16" : isEntry ? "mt-0" : "mt-2" }`}>
                {Menu.map((menu, index) => (
                    <>
                        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 rounded-md cursor-pointer p-2 hover:bg-sky-100 hover:bg-opacity-25 transition ease-in mt-4
                         ${(selected === index) ? "bg-sky-100 bg-opacity-25 scale-105" : ""}
                         ${menu.title === "Applications" ? "hidden" : ""}`}
                         onClick={()=>onChange(index)}>
                            <span className={`${menu.title === "Previous Leaves" ? "text-xl" : "text-2xl"} float-left block`}>
                                {menu.icon ? menu.icon : <RiDashboardFill/>}
                            </span>
                            <span className={`text-base font-medium flex-1 duration-150 ${!open && "hidden"}`}>{menu.title}</span>
                        </li>
                        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 rounded-md cursor-pointer p-2 hover:bg-sky-100 hover:bg-opacity-25 transition ease-in mt-4
                         ${(selected === index) ? "bg-sky-100 bg-opacity-25 scale-105" : ""}
                         ${menu.title === "Applications" ? "" : "hidden"}`}
                         onClick={()=>onChange(index)}>
                            <span className={`text-2xl float-left block`}>
                                {menu.icon ? menu.icon : <RiDashboardFill/>}
                            </span>
                            <span className={`text-base font-medium flex-1 duration-150 ${!open && "hidden"}`}>{menu.title}
                                <span className='rounded-full bg-gray-100 py-1 px-3 ml-16 text-blue-800 text-sm'>
                                    {length}
                                </span>
                            </span>
                        </li>
                    </>
                ))}
                <li className={`text-gray-300 text-sm flex items-center gap-x-4 rounded-md cursor-pointer p-2 hover:bg-sky-100 hover:bg-opacity-25 transition ease-in ${isEntry ? "mt-2" : "mt-20"}`}
                    onClick = {(e) => processLogout(e)}>
                    <span className="text-2xl float-left block text-red-500">
                        {<TbLogout/>}
                    </span>
                    <span className={`text-base font-medium flex-1 duration-150  ${!open && "hidden"} `}>Logout</span>
                </li>
                
            </ul>
        </div>
    );
}

export default Sidebar;