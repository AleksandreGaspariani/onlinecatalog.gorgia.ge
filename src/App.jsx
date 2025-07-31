import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter, Outlet, useLocation } from 'react-router-dom'
import NavRoutes from './components/NavRoutes'
import Dashboard from './pages/dashboard/Dashboard'
import Footer from './components/FooterModal'
import AdminPage from './components/admin/AdminPage'

function Layout() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/admin');

  return (
    <div style={{ margin: '0 !important', width: '100% !important' }}>
      <NavRoutes />
      <div style={{ height: '80vh', marginTop: '5vh' }}>
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App