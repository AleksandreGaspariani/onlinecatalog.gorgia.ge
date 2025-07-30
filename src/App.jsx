import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import NavRoutes from './components/NavRoutes'
import Dashboard from './pages/dashboard/Dashboard'
import Footer from './components/FooterModal'

function Layout() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= docHeight - 10) {
        setFooterVisible(true);
      } else {
        setFooterVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ margin: '0 !important', width: '100%' }}>
      <NavRoutes />
      <Outlet />
      <Footer visible={footerVisible} />
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