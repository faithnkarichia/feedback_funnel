import { useState, useEffect } from "react";

export default function SurveyBuilder() {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    type: "text",
    options: [],
    required: false,
  });

  const [optionInput, setOptionInput] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate form on changes
  useEffect(() => {
    const newErrors = {};
    
    if (touched.title && !survey.title.trim()) {
      newErrors.title = "Survey title is required";
    }
    
    if (currentQuestion.questionText && touched.currentQuestion) {
      if (!currentQuestion.questionText.trim()) {
        newErrors.currentQuestion = "Question text is required";
      }
      
      if ((currentQuestion.type === "radio" || currentQuestion.type === "checkbox") && 
          currentQuestion.options.length < 2) {
        newErrors.options = "At least two options are required";
      }
    }
    
    setErrors(newErrors);
  }, [survey, currentQuestion, touched]);

  // Handle survey title/description changes
  const handleSurveyChange = (e) => {
    const { name, value } = e.target;
    setSurvey((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Handle current question input changes
  const handleQuestionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setTouched((prev) => ({ ...prev, currentQuestion: true }));
  };

  // Add option to the current question
  const addOption = () => {
    if (optionInput.trim() !== "") {
      setCurrentQuestion((prev) => ({
        ...prev,
        options: [...prev.options, optionInput.trim()],
      }));
      setOptionInput("");
      setTouched((prev) => ({ ...prev, options: true }));
    }
  };

  // Remove an option from the current question
  const removeOption = (index) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  // Add the current question to the survey
  const addQuestionToSurvey = () => {
    if (!validateQuestion()) return;
    
    setSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...currentQuestion }],
    }));
    
    // Reset question form
    setCurrentQuestion({
      questionText: "",
      type: "text",
      options: [],
      required: false,
    });
    
    setTouched((prev) => ({ ...prev, currentQuestion: false, options: false }));
  };

  // Validate current question
  const validateQuestion = () => {
    const newTouched = {
      currentQuestion: true,
      options: true,
    };
    setTouched((prev) => ({ ...prev, ...newTouched }));
    
    if (!currentQuestion.questionText.trim()) return false;
    
    if ((currentQuestion.type === "radio" || currentQuestion.type === "checkbox") && 
        currentQuestion.options.length < 2) {
      return false;
    }
    
    return true;
  };

  // Handle option input key press
  const handleOptionKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOption();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSurvey()) {
      // Here you would typically send the survey data to your backend
      console.log("Survey data:", survey);
      alert("Survey created successfully!");
    }
  };

  // Validate entire survey
  const validateSurvey = () => {
    const newTouched = {
      title: true,
      currentQuestion: true,
      options: true,
    };
    setTouched(newTouched);
    
    if (!survey.title.trim()) return false;
    if (survey.questions.length === 0) {
      alert("Please add at least one question to the survey");
      return false;
    }
    
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Survey</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Survey Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Survey Details</h2>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Survey Title *
            </label>
            <input
              id="title"
              className={`border rounded-md w-full p-3 ${errors.title ? "border-red-500" : "border-gray-300"}`}
              type="text"
              name="title"
              placeholder="Enter survey title"
              value={survey.title}
              onChange={handleSurveyChange}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="border border-gray-300 rounded-md w-full p-3"
              name="description"
              placeholder="Describe the purpose of your survey"
              rows={3}
              value={survey.description}
              onChange={handleSurveyChange}
            />
          </div>
        </div>

        {/* Question Builder */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Add Questions</h2>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
            <div>
              <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
                Question Text *
              </label>
              <input
                id="questionText"
                className={`border rounded-md w-full p-3 ${errors.currentQuestion ? "border-red-500" : "border-gray-300"}`}
                type="text"
                name="questionText"
                placeholder="Enter your question"
                value={currentQuestion.questionText}
                onChange={handleQuestionChange}
              />
              {errors.currentQuestion && <p className="mt-1 text-sm text-red-600">{errors.currentQuestion}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={currentQuestion.type}
                  onChange={handleQuestionChange}
                  className="border border-gray-300 rounded-md w-full p-3"
                >
                  <option value="text">Text Response</option>
                  <option value="radio">Single Choice</option>
                  <option value="checkbox">Multiple Choice</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  id="required"
                  name="required"
                  type="checkbox"
                  checked={currentQuestion.required}
                  onChange={handleQuestionChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
                  Required question
                </label>
              </div>
            </div>

            {/* Options (only show if checkbox/radio) */}
            {(currentQuestion.type === "radio" || currentQuestion.type === "checkbox") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options *
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={optionInput}
                    placeholder="Add an option"
                    onChange={(e) => setOptionInput(e.target.value)}
                    onKeyPress={handleOptionKeyPress}
                    className="border border-gray-300 rounded-md p-2 flex-1"
                  />
                  <button
                    type="button"
                    onClick={addOption}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                {errors.options && <p className="mt-1 text-sm text-red-600">{errors.options}</p>}
                
                {currentQuestion.options.length > 0 && (
                  <div className="mt-2 border border-gray-200 rounded-md p-3 bg-white">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Current Options:</h3>
                    <ul className="space-y-2">
                      {currentQuestion.options.map((opt, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                          <span>{opt}</span>
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
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
              disabled={!!errors.currentQuestion || !!errors.options}
              className={`px-4 py-2 rounded-md text-white ${errors.currentQuestion || errors.options ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 transition-colors"}`}
            >
              Add Question to Survey
            </button>
          </div>
        </div>

        {/* Questions List */}
        {survey.questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Added Questions ({survey.questions.length})
            </h2>
            
            <div className="space-y-3">
              {survey.questions.map((q, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 bg-white">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800">{q.questionText}</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {q.type === "text" && "Text"}
                      {q.type === "radio" && "Single Choice"}
                      {q.type === "checkbox" && "Multiple Choice"}
                    </span>
                  </div>
                  {q.required && (
                    <span className="inline-block mt-2 text-xs font-medium text-red-600">
                      Required
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Survey
          </button>
        </div>
      </form>
    </div>
  );
}