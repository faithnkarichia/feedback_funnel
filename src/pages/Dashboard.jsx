import { Binoculars,Plus ,X} from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
export default function Dashboard(){
    const [viewModalOpen, setViewModalOpen]=useState(false)

const survey = {
  title: "User Experience Survey",
  description: "Help us improve by answering a few quick questions.",

  questions: [
    {
      id: 1,
      type: "radio",
      question: "How satisfied are you with our app?",
      options: ["Very satisfied", "Satisfied", "Neutral", "Unsatisfied"],
    },
    {
      id: 2,
      type: "checkbox",
      question: "Which features do you use the most?",
      options: ["Dashboard", "Notifications", "Reports", "Settings"],
    },
    {
      id: 3,
      type: "text",
      question: "Any suggestions or feedback?",
      placeholder: "Write your feedback here...",
    },
  ],
};





    const navigate=useNavigate()

     const handleHome=()=>{
        navigate("/")
    }
    return(
        <>
         <nav className="bg-gray-900 text-white w-full  p-2 
                sm:h-[7vh]  lg:h-[7vh] relative z-20">
  <ul className="flex items-center h-full">
    <div onClick={handleHome} className="flex items-center w-full">
      <Binoculars  className="text-red-500"/>
      <li className="text-xl ml-2">Feedback funnel</li>
    </div>

    <div className="flex gap-3">

        <li className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 " ><Plus/></li>
      <li className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 " >Logout</li>
   

    </div>
      
      
    
  </ul>
</nav>

<div className="grid lg:grid-cols-4 p-4">

            <div className="flex flex-col p-3 bg-gray-100 shadow-2xl rounded ">


<h1 className="font-bold text-2xl mb-2">{survey.title}</h1>
<p className="text-gray-500 mb-2">{survey.description}</p>
<h3 className="mb-4 ">{survey.questions.length} Questions</h3>
<div className="flex gap-3 items-center justify-between">
    <button onClick={()=>{setViewModalOpen(!viewModalOpen)}} className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400  text-white">view</button>
<button className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white ">Delete</button>
<button className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white ">Edit</button>
</div>




        </div>
</div>
{/* view survey modal */}

{
    viewModalOpen && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm  flex items-center justify-center z-50 ">
    <div className="flex flex-col p-3 bg-gray-100 shadow-2xl rounded relative w-[90%] lg:w-[60%]  z-20 h-fit">
    <button className="flex justify-end hover:text-red-500" onClick={()=>{setViewModalOpen(false)}}><X/></button>
<h1 className="font-bold text-2xl mb-2">{survey.title}</h1>
<p className="text-gray-500 mb-2">{survey.description}</p>
<ul>
{survey.questions && survey.questions.map((question)=>(
<li key={question.id}>
<h3 className="mb-3 font-semibold">{question.id}. {question.question}</h3>
<h3 className="mb-3 font-semibold">Type: {question.type}</h3>
<ul>
    <h3 className="font-semibold">Options:</h3>
    {question.options? question.options.map((option)=>(
    <li className="text-gray-500">{option}</li>
)): <h3 className="text-gray-500">{question.placeholder} </h3> }
</ul>



</li>
))}
</ul>
<div className="flex justify-between mt-4">
    <button className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white w-[20%]">Delete</button>
<button className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white w-[20%]">Edit</button>
</div>


</div></div>)
}

        </>
    )
}