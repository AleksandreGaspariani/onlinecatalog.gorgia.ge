import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import NavRoutes from './components/NavRoutes'
import Dashboard from './pages/dashboard/Dashboard'
import Footer from './components/FooterModal'

function Layout() {

  return (
    <div style={{ margin: '0 !important', width: '100% !important' }}>
      <NavRoutes />
      <div style={{height: '80vh', marginTop: '15vh'}}>
        <Outlet />
      </div>
      <Footer />
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App