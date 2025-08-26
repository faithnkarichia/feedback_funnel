import { Binoculars,Menu,X } from "lucide-react"
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Navbar(){

      const [isOpen, setIsOpen]=useState(false)
    const navigate=useNavigate()

    const handleLogin=()=>{
navigate("/login")
    }

    const handleHome=()=>{
        navigate("/")
    }

    const handleSignup=()=>{
        navigate("/signup")
    }
    return(
        <>    <nav className="bg-gray-900 text-white w-full  p-2 
                sm:h-[7vh]  lg:h-[7vh] relative z-20">
  <ul className="flex items-center justify-between h-full">
    <div onClick={handleHome} className="flex items-center w-full">
      <Binoculars  className="text-red-500"/>
      <li className="text-xl ml-2">Feedback funnel</li>
    </div>

    <div className="hidden  md:flex justify-end gap-20 w-full">
      <li className="bg-red-500 py-1 rounded-md px-2 "  onClick={handleLogin}>Login</li>
      <li className="bg-red-500 py-1 rounded-md px-2  " onClick={handleSignup}>SignUp</li>
    </div>

    <div className="md:hidden" onClick={()=>setIsOpen(!isOpen)}>
      {isOpen? <X/>: <Menu/>}
    </div>
  </ul>
</nav>

{/* modal */}
{isOpen &&
(
    <div className="bg-gray-300 absolute z-50 p-2 w-[30%] flex justify-center mt-11  ml-[70%] lg:hidden ">
<ul >
    <li className="mb-5 hover:text-red-500" onClick={()=>{setIsOpen(false) ;handleLogin()}}>Login</li>
    <li className="hover:text-red-500" onClick={()=>{setIsOpen(false); handleSignup()}}>SignUp</li>
</ul>
</div>
)
}

</>
    
    )
}