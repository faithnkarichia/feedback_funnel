import { Binoculars } from "lucide-react"
import Navbar from "../components/Navbar"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const navigate=useNavigate()
    // get data from the input
    // check if it matches what we want
    const[loginData, setLoginData]=useState({
        email:"",
        password:""
    })
const handleChange=(e)=>{
const{name,value}=e.target
setLoginData((prev)=>({...prev,[name]:value}))



}

const handleSubmit=(e)=>{
    e.preventDefault()
if(loginData.email=="faith@example.com" && loginData.password=="1234"){
navigate("/dashboard")
}
else{
    console.log("invalid email or password")
}
setLoginData({
    email:"",
    password:""
})
}

    return(
        <>
   <Navbar/>
        <div className="flex items-center justify-center h-[90vh]  ">
           <div className="bg-gray-100 w-2xs p-6 rounded shadow">
            <h1 className=" font-semibold flex">Login to <Binoculars className="text-red-500 ml-3 "/>Feedback Funnel</h1>
            <form onSubmit={handleSubmit}>

            <div className="flex flex-col">
                <label htmlFor="email" className="mt-10">email:</label>
            <input className="border-1 border-gray-400 rounded p-1 text-gray-600" type="text" name="email" value={loginData.email} onChange={handleChange}/>
            <label htmlFor="password" className="mt-10">password:</label>
            <input className="border-1 rounded border-gray-400 p-1 text-gray-600 " type="password" name="password" value={loginData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="bg-red-500 py-1 rounded-md px-2 w-full my-10 text-white hover:bg-red-400">Login</button>

            </form>
            <p className="text-xs">Dont have an account? <span className="font-bold hover:text-red-500"><a href="/signup">SignUp</a></span></p>
           </div>
        </div></>
        
    )
}