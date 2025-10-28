import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import LoginView from './views/LoginView'
import LoginCityhall from './views/LoginCityhall' 

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/loginCItyhall" element={<LoginCityhall />} />
      <Route path="/*" element={<AppShell />} />
    </Routes>
  )
}

export default App