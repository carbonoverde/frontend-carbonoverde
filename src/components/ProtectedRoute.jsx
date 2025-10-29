import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
  // pega o token do Redux
  const token = useSelector((state) => state.auth?.token)

  // se não tiver token, volta pra tela de login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // se tiver token, deixa acessar a rota
  return <Outlet />
}

export default ProtectedRoute
