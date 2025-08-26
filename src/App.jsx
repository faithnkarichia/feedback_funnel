import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import {Routes,Route }from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/SignupPage'



function App() {
  

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
        
     
    
    </Routes>
  )
}

export default App
