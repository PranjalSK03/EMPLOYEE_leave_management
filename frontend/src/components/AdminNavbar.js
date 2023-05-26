

function AdminNavbar(){

    return (
        <nav className="bg-purple-900 text-white flex justify-between py-4 rounded-xl my-2 mx-4 shadow-[0_10px_15px_5px_rgba(80,0,80,0.7)]">
            <div className="">
                <h1 className="py-3 font-bold text-4xl mx-8">Aphelion</h1>
            </div>
            <ul className="px-16 py-4 flex space-x-11 justify-end text-lg">
                <li className="cursor-pointer hover:underline">About</li>
                <li className="cursor-pointer hover:underline">EmpLogin</li>
                <li className="cursor-pointer hover:underline">EmpRegister</li>
            </ul>
        </nav>
    );
}

export default AdminNavbar;