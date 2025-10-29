import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/registerView" element={<RegisterView />} />
      {/* Rotas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<AppShell />} />
      </Route>
    </Routes>
  )
}

export default App
