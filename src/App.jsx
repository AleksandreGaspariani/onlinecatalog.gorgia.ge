import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import NavRoutes from './components/NavRoutes'
import Dashboard from './pages/dashboard/Dashboard'
import Footer from './components/FooterModal'
import Category from './pages/category/Category'

function Layout() {

  return (
    <div style={{ margin: '0 !important', width: '100% !important' }}>
      <NavRoutes />
      <div style={{height: 'fit-content', marginTop: '10vh'}}>
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
          <Route path="category/:categoryId" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App