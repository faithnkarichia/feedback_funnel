import { Binoculars, Plus, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [surveys, setSurveys] = useState([
    {
      id: 1,
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
    }
  ]);

  const [newSurvey, setNewSurvey] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    type: "text",
    options: [],
  });

  const [optionInput, setOptionInput] = useState("");
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleAddSurvey = () => {
    if (!newSurvey.title.trim()) return;
    
    const newSurveyWithId = {
      ...newSurvey,
      id: surveys.length + 1,
    };
    
    setSurveys([...surveys, newSurveyWithId]);
    setNewSurvey({
      title: "",
      description: "",
      questions: [],
    });
    setAddModalOpen(false);
  };

  const addQuestionToSurvey = () => {
    if (!currentQuestion.questionText) return;
    
    setNewSurvey(prev => ({
      ...prev,
      questions: [...prev.questions, {...currentQuestion}]
    }));
    
    setCurrentQuestion({
      questionText: "",
      type: "text",
      options: [],
    });
  };

  const addOption = () => {
    if (optionInput.trim() !== "") {
      setCurrentQuestion(prev => ({
        ...prev,
        options: [...prev.options, optionInput.trim()]
      }));
      setOptionInput("");
    }
  };

  const removeSurvey = (id) => {
    setSurveys(surveys.filter(survey => survey.id !== id));
  };

  return (
    <>
      <nav className="bg-gray-900 text-white w-full p-2 sm:h-[7vh] lg:h-[7vh] relative z-20">
        <ul className="flex items-center h-full">
          <div onClick={handleHome} className="flex items-center w-full cursor-pointer">
            <Binoculars className="text-red-500" />
            <li className="text-xl ml-2">Feedback funnel</li>
          </div>

          <div className="flex gap-3">
            <li 
              className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 cursor-pointer" 
              onClick={() => setAddModalOpen(true)}
            >
              <Plus />
            </li>
            <li className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 cursor-pointer">Logout</li>
          </div>
        </ul>
      </nav>

      <div className="grid lg:grid-cols-4 p-4 gap-4">
        {surveys.map(survey => (
          <div key={survey.id} className="flex flex-col p-3 bg-gray-100 shadow-2xl rounded">
            <h1 className="font-bold text-2xl mb-2">{survey.title}</h1>
            <p className="text-gray-500 mb-2">{survey.description}</p>
            <h3 className="mb-4">{survey.questions.length} Questions</h3>
            <div className="flex gap-3 items-center justify-between">
              <button 
                onClick={() => setViewModalOpen(survey.id)} 
                className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white"
              >
                View
              </button>
              <button 
                onClick={() => removeSurvey(survey.id)}
                className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white"
              >
                Delete
              </button>
              <button className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Survey Modal */}
      {viewModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col p-3 bg-gray-100 shadow-2xl rounded relative w-[90%] lg:w-[60%] z-20 h-fit max-h-[80vh] overflow-y-auto">
            <button className="absolute top-2 right-2 hover:text-red-500" onClick={() => setViewModalOpen(false)}>
              <X />
            </button>
            
            {surveys.filter(s => s.id === viewModalOpen).map(survey => (
              <div key={survey.id}>
                <h1 className="font-bold text-2xl mb-2">{survey.title}</h1>
                <p className="text-gray-500 mb-2">{survey.description}</p>
                <ul className="space-y-4">
                  {survey.questions.map((question) => (
                    <li key={question.id} className="border-b pb-3">
                      <h3 className="mb-3 font-semibold">{question.id}. {question.question}</h3>
                      <h3 className="mb-3 font-semibold">Type: {question.type}</h3>
                      {question.options && (
                        <div>
                          <h3 className="font-semibold">Options:</h3>
                          <ul className="list-disc pl-5 text-gray-500">
                            {question.options.map((option, i) => (
                              <li key={i}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {question.placeholder && (
                        <p className="text-gray-500 mt-2">Placeholder: {question.placeholder}</p>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={() => removeSurvey(survey.id)}
                    className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white w-[20%]"
                  >
                    Delete
                  </button>
                  <button className="bg-red-500 py-1 rounded-md px-2 hover:bg-red-400 text-white w-[20%]">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Survey Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-xl relative w-[90%] lg:w-3/4 z-20 max-h-[80vh] overflow-y-auto">
            <button 
              className="absolute top-4 right-4 hover:text-red-500" 
              onClick={() => setAddModalOpen(false)}
            >
              <X />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Survey</h2>
            
            <div className="space-y-6">
              {/* Survey Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Survey Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Survey Title *
                  </label>
                  <input
                    className="border border-gray-300 rounded-md w-full p-3"
                    type="text"
                    placeholder="Enter survey title"
                    value={newSurvey.title}
                    onChange={(e) => setNewSurvey({...newSurvey, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-md w-full p-3"
                    placeholder="Describe the purpose of your survey"
                    rows={3}
                    value={newSurvey.description}
                    onChange={(e) => setNewSurvey({...newSurvey, description: e.target.value})}
                  />
                </div>
              </div>

              {/* Question Builder */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Add Questions</h3>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Text *
                    </label>
                    <input
                      className="border border-gray-300 rounded-md w-full p-3"
                      type="text"
                      placeholder="Enter your question"
                      value={currentQuestion.questionText}
                      onChange={(e) => setCurrentQuestion({
                        ...currentQuestion, 
                        questionText: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question Type
                      </label>
                      <select
                        value={currentQuestion.type}
                        onChange={(e) => setCurrentQuestion({
                          ...currentQuestion, 
                          type: e.target.value
                        })}
                        className="border border-gray-300 rounded-md w-full p-3"
                      >
                        <option value="text">Text Response</option>
                        <option value="radio">Single Choice</option>
                        <option value="checkbox">Multiple Choice</option>
                      </select>
                    </div>
                  </div>

                  {/* Options (only show if checkbox/radio) */}
                  {(currentQuestion.type === "radio" || currentQuestion.type === "checkbox") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Options
                      </label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={optionInput}
                          placeholder="Add an option"
                          onChange={(e) => setOptionInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addOption()}
                          className="border border-gray-300 rounded-md p-2 flex-1"
                        />
                        <button
                          type="button"
                          onClick={addOption}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                      
                      {currentQuestion.options.length > 0 && (
                        <div className="mt-2 border border-gray-200 rounded-md p-3 bg-white">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Current Options:</h3>
                          <ul className="space-y-2">
                            {currentQuestion.options.map((opt, index) => (
                              <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                <span>{opt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={addQuestionToSurvey}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Question to Survey
                  </button>
                </div>
              </div>

              {/* Questions List */}
              {newSurvey.questions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Added Questions ({newSurvey.questions.length})
                  </h3>
                  
                  <div className="space-y-3">
                    {newSurvey.questions.map((q, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4 bg-white">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">{q.questionText}</h3>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {q.type === "text" && "Text"}
                            {q.type === "radio" && "Single Choice"}
                            {q.type === "checkbox" && "Multiple Choice"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddSurvey}
                  disabled={!newSurvey.title.trim()}
                  className={`px-4 py-2 rounded-md text-white ${
                    !newSurvey.title.trim() 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Create Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}