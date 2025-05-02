import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './pages/MainRouter'

function App() {
  return (
    <BrowserRouter>
      <MainRouter/>
    </BrowserRouter>    
  )
}

export default App
