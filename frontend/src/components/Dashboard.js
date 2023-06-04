import {useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './DashboardSidebar'
import Profile from './DashboardProfile'
import Status from './DashboardStatus'
import PreviousLeaves from './DashboardPrevLeave'
import ViewApplication from './DashboardViewApplication'
import Apply from './DashboardApply'
import OnLeave from './DashboardOnLeave'
import Employees from './DashboardEmps'
import axios from 'axios'

import "react-circular-progressbar/dist/styles.css";


function Dashboard(){

    const navigate = useNavigate();

    // useEffect(() => {
    //     document.body.classList.add('bg-blue-300');
    // }, []);

    const [employee , setEmployee] = useState(null)
    const [count , setCount] = useState(0);
    const [option, setOption] = useState(3);
    const [select, setSelected] = useState(0);
    const [length, setLength] = useState(0);
    const [isCEO, setIsCEO] = useState(false);
    const [employeeDept, setEmployeeDept] = useState(null);

    const getProfile = async() => {
        try{
            const response = await axios.get('/user',{withCredentials:true})
            console.log({response})
            if(response.data.success) {
                setEmployeeDept(response.data.employee.empDept);
                setEmployee(response.data.employee)
                setCount(response.data.applicationCount)
                setOption(response.data.options);
                setLength(response.data.lenAppToVerify);
                setIsCEO(response.data.isCeo);
                // window.location.reload();
            }
            
        }
        catch(error) {
            console.log(error)
            navigate('/login')
        }
    }

    
    useEffect(() => {
        getProfile();
    },[])

    
    

    return(
        <div className='flex bg-blue-300'>
           <Sidebar selected={select} onChange={setSelected} option={option} length = {length}/>
            {select === 0  && employee  && (<Profile employee = {employee} count={count} isCEO = {isCEO}/>)}
            {select === 1  && !isCEO && (<Apply />)}
            {select === 1  && isCEO && (<ViewApplication />)}
            {select === 2  && !isCEO && (<Status selected={select} onChange={setSelected}/>)}
            {select === 2  && isCEO && (<OnLeave/>)}
            {select === 3  && !isCEO && (<PreviousLeaves selected={select} onChange={setSelected}/>)}{/*Previous Leaves needs to be mentioned here*/}
            {select === 3  && isCEO && (<Employees isCEO = {isCEO} employeeDept = {employeeDept} empl = {employee} onChange={setSelected}/>)}{/*Previous Leaves needs to be mentioned here*/}
            {select === 4  && (<ViewApplication />)}
            {select === 5  && (<OnLeave/>)}
            {select === 6  && (<Employees isCEO = {isCEO} employeeDept = {employeeDept} empl = {employee} onChange={setSelected}/>)}
            
            
        </div>
    );
}


export default Dashboard;