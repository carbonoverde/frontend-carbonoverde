import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeView from '@/views/HomeView'
import OrdersView from '@/views/OrdersView'
import OperationsView from '@/views/OperationsView'
import CustomersView from '@/views/CustomersView'
import SettingsView from '@/views/SettingsView'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/orders" element={<OrdersView />} />
      <Route path="/operations" element={<OperationsView />} />
      <Route path="/customers" element={<CustomersView />} />
      <Route path="/settings" element={<SettingsView />} />
    </Routes>
  )
}

export default AppRoutes
