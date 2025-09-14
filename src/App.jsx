import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import {Routes,Route }from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import AddSurvey from './components/AddSurvey'



function App() {
  

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/addSurvey" element={<AddSurvey/>}/>
        
     
    
    </Routes>
  )
}

export default App
