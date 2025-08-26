import { Binoculars,Menu,X } from "lucide-react"
import React from "react"
import { useState } from "react"
export default function LandingPage(){

    // working on the modal
    // so i have to create the model and show it only on click of the button
    // why do i need the state

    const [isOpen, setIsOpen]=useState(false)

    



    return(
        <div className="flex flex-col items-center ">
   <nav className="bg-gray-900 text-white w-full  p-2 
                sm:h-[7vh]  lg:h-[7vh] relative z-20">
  <ul className="flex items-center justify-between h-full">
    <div className="flex items-center w-full">
      <Binoculars className="text-red-500"/>
      <li className="text-xl ml-2">Feedback funnel</li>
    </div>

    <div className="hidden  md:flex justify-end gap-20 w-full">
      <li className="bg-red-500 py-1 rounded-md px-2 ">Login</li>
      <li className="bg-red-500 py-1 rounded-md px-2  ">SignUp</li>
    </div>

    <div className="md:hidden" onClick={()=>setIsOpen(!isOpen)}>
      {isOpen? <X/>: <Menu/>}
    </div>
  </ul>
</nav>
<div className="relative bg-[url('./assets/survey.jpg')] bg-cover bg-center bg-no-repeat h-[95vh] flex flex-col items-center md:w-full md:justify-center">
 <div className="absolute inset-0 bg-black/50"></div>
    <div className="px-2 mt-30 text-2xl  w-[80%]   text-white relative z-10"><h1 className="font-bold text-4xl mb-5 md:text-5xl lg:text-6xl">Welcome to Feedback Funnel </h1>
    <p className="lg:text-3xl">We’ve made creating surveys simple, efficient, and powerful — just for you.</p>

    <button className="bg-red-500 py-1 rounded-md px-2 mt-10">Get Started</button></div>

</div>
{/* modal */}
{isOpen &&
(
    <div className="bg-gray-300 absolute z-50 p-2 w-[30%] flex justify-center mt-11  ml-[70%] lg:hidden ">
<ul >
    <li className="mb-5 hover:text-red-500" onClick={()=>{setIsOpen(false)}}>Login</li>
    <li className="hover:text-red-500" onClick={()=>{setIsOpen(false)}}>SignUp</li>
</ul>
</div>
)
}


<div className="bg-gray-900 w-full"><footer className=" text-white py-6 text-center mt-10">
  <p className="text-sm">
    © {new Date().getFullYear()} Created by <span className="font-semibold">Faith Nkarichia</span>
  </p>
  <div className="mt-2 space-x-4">
    <a href="tel:+254768692489" className="hover:underline">📞 +254 768 692 489</a>
    <a href="mailto:faynkarichia@gmail.com" className="hover:underline">✉️ faynkarichia@gmail.com</a>
  </div>
</footer></div>


            

        </div>
    )
}