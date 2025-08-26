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
import Login from './components/Login'
import axios from 'axios'

function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const hideFooter = location.pathname.startsWith('/admin') || isLogin;

  return (
    <div style={{ margin: '0 !important', width: '100% !important' }}>
      {!isLogin && <NavRoutes />}
      <div style={{ height: 'fit-content', marginTop: '10vh' }}>
        {!isDashboard && !isLogin && <Breadcrumb />}
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  )
}

function App() {
  const token = localStorage.getItem('authToken');
  const [profileChecked, setProfileChecked] = React.useState(false);
  const [profileIncomplete, setProfileIncomplete] = React.useState(false);

  React.useEffect(() => {
    if (token) {
      axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const profile = res.data;
        if (!profile || Object.values(profile).some(v => !v)) {
          setProfileIncomplete(true);
        }
        setProfileChecked(true);
      }).catch(() => {
        setProfileIncomplete(true);
        setProfileChecked(true);
      });
    }
  }, [token]);

  if (!token) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }

  if (!profileChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {profileIncomplete ? (
            <Route path="*" element={<AdminPage />} />
          ) : (
            <>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="category/:categoryName" element={<Category />} />
                <Route path="category/:categoryName/product/:productName" element={<Product />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="/admin/*" element={<AdminPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App