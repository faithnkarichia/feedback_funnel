import React from "react"
import Navbar from "../components/Navbar"
export default function LandingPage(){

    // working on the modal
    // so i have to create the model and show it only on click of the button
    // why do i need the state

  

    



    return(
        <div className="flex flex-col items-center ">
            <Navbar/>
   
<div className="relative bg-[url('./assets/survey.jpg')] bg-cover bg-center bg-no-repeat h-[95vh] flex flex-col items-center md:w-full md:justify-center">
 <div className="absolute inset-0 bg-black/50"></div>
    <div className="px-2 mt-30 text-2xl  w-[80%]   text-white relative z-10"><h1 className="font-bold text-4xl mb-5 md:text-5xl lg:text-6xl">Welcome to Feedback Funnel </h1>
    <p className="lg:text-3xl">We’ve made creating surveys simple, efficient, and powerful — just for you.</p>

    <button className="bg-red-500 py-1 rounded-md px-2 mt-10">Get Started</button></div>

</div>



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