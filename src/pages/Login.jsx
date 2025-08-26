import { Binoculars } from "lucide-react"
import Navbar from "../components/Navbar"
export default function Login(){
    return(
        <>
   <Navbar/>
        <div className="flex items-center justify-center h-[90vh]  ">
           <div className="bg-gray-100 w-2xs p-6 rounded shadow">
            <h1 className=" font-semibold flex">Login to <Binoculars className="text-red-500 ml-3 "/>Feedback Funnel</h1>
            <div className="flex flex-col">
                <label htmlFor="email" className="mt-10">email:</label>
            <input className="border-1 border-gray-400 rounded p-1 text-gray-600" type="text" name="email" />
            <label htmlFor="password" className="mt-10">password:</label>
            <input className="border-1 rounded border-gray-400 p-1 text-gray-600 " type="text" name="password" />
            </div>
            <button className="bg-red-500 py-1 rounded-md px-2 w-full my-10 text-white hover:bg-red-400">Login</button>
            <p className="text-xs">Dont have an account? <span className="font-bold hover:text-red-500"><a href="">SignUp</a></span></p>
           </div>
        </div></>
        
    )
}