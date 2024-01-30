import { useState } from 'react'
import './App.css'
import StartForm from './components/startForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Check from './components/Check';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartForm />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </Router>
  )
}

export default App
