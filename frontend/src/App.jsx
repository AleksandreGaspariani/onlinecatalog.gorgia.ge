import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter, Outlet, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import NavRoutes from './components/NavRoutes'
import Dashboard from './pages/dashboard/Dashboard'
import Footer from './components/FooterModal'
import Category from './pages/category/Category'
import Product from './pages/product/Product'
import Breadcrumb from './components/Breadcrumb'
import AdminPage from './components/admin/AdminPage'

function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const hideFooter = location.pathname.startsWith('/admin');

  return (
    <div style={{ margin: '0 !important', width: '100% !important' }}>
      <NavRoutes />
      <div style={{ height: 'fit-content', marginTop: '10vh' }}>
        {!isDashboard && <Breadcrumb />}
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="category/:categoryName" element={<Category />} />
            <Route path="category/:categoryName/product/:productName" element={<Product />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App