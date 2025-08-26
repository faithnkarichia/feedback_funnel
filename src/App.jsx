import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import {Routes,Route }from 'react-router-dom'
import Login from './pages/Login'



function App() {
  

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
        
     
    
    </Routes>
  )
}

export default App
