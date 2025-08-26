import Navbar from "../components/Navbar"
import { Binoculars } from "lucide-react"
export default function Signup(){
    return(
        <>
        <Navbar/>
        

       <div className="flex items-center justify-center h-[90vh]  ">
           <div className="bg-gray-100 w-xs p-6 rounded shadow">
            <h1 className=" font-semibold flex">SignUp to <Binoculars className="text-red-500 ml-3 "/>Feedback Funnel</h1>
            <div className="flex flex-col">
                <label htmlFor="firstName" className="mt-10">firstName:</label>
            <input className="border-1 border-gray-400 rounded p-1 text-gray-600" type="text" name="firstName" />
            <label htmlFor="lastName" className="mt-10">lastName:</label>
            <input className="border-1 border-gray-400 rounded p-1 text-gray-600" type="text" name="lastName" />
                <label htmlFor="email" className="mt-10">email:</label>
            <input className="border-1 border-gray-400 rounded p-1 text-gray-600" type="text" name="email" />
            <label htmlFor="password" className="mt-10">password:</label>
            <input className="border-1 rounded border-gray-400 p-1 text-gray-600 " type="text" name="password" />

<label htmlFor="confirmPassword" className="mt-10">confirm Password:</label>
            <input className="border-1 rounded border-gray-400 p-1 text-gray-600 " type="text" name="confirm password" />

            </div>
            <button className="bg-red-500 py-1 rounded-md px-2 w-full my-10 text-white hover:bg-red-400">SignUp</button>
            <p className="text-xs">Already have an account? <span className="font-bold hover:text-red-500"><a href="/login">Login</a></span></p>
           </div>
        </div>
        </>
    )

}