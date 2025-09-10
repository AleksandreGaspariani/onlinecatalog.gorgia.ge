import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../assets/css/AdminPage.module.css'
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom'
import CategoryTable from './CategoryTable'
import ProductsTable from './ProductTable';
import OrderRequest from './OrderRequestTable'
import Orders from './OrdersTable'
import Profile from './ProfileTable'
import Users from './UsersTable'
import { FaHome, FaThList, FaBoxOpen, FaClipboardList, FaShoppingCart, FaUserCircle, FaUsers } from 'react-icons/fa'
import defaultInstance from '../../api/defaultInstance'



const AdminPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate()
    const location = useLocation()
    const role = useSelector(state => state.user.role);
    const currentPath = location.pathname

    const sidebarItems = [
        { label: 'მთავარი', key: 'main', icon: <FaHome />, path: '/' },
        ...(role && role !== 'contragent'
            ? [
                { label: 'კატეგორიები', key: 'categories', icon: <FaThList />, path: '/admin/categories' },
                { label: 'პროდუქტები', key: 'products', icon: <FaBoxOpen />, path: '/admin/products' }
            ]
            : []
        ),
        { label: 'შეკვეთების მოთხოვნები', key: 'requests', icon: <FaClipboardList />, path: '/admin/requests' },
        { label: 'შეკვეთები', key: 'orders', icon: <FaShoppingCart />, path: '/admin/orders' },
        { label: 'პროფილი', key: 'profile', icon: <FaUserCircle />, path: '/admin/profile' },
        { label: 'მომხმარებლები', key: 'users', icon: <FaUsers />, path: '/admin/users' }
    ];

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                await defaultInstance.post('/logout', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                localStorage.removeItem('authToken');
            }
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            localStorage.removeItem('authToken');
            navigate('/login');
        }
    };

    return (
        <div className={styles.adminContainer}>
            <aside
                className={`${styles.adminSidebar} ${!sidebarOpen ? styles.adminSidebarClosed : ''}`}
            >
                <div className={styles.adminSidebarHeader}>
                    <button
                        className={styles.sidebarToggleBtn}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                        style={{ border: 'none', outline: 'none', background: 'none' }}
                    >
                        {sidebarOpen ? '×' : '≡'}
                    </button>
                    {sidebarOpen && (
                        <span className={styles.adminCatalogTitle} onClick={() => window.location.reload()}>Catalog</span>
                    )}
                </div>
                {sidebarOpen && (
                    <nav className={styles.adminSidebarNav}>
                        {sidebarItems.map((item, idx) => (
                            <div
                                className={styles.adminSidebarItem}
                                key={idx}
                                style={{
                                    background: currentPath === item.path ? '#e0e5eb85' : undefined,
                                    fontWeight: currentPath === item.path ? 'bold' : undefined,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                onClick={() => navigate(item.path)}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <span style={{ marginRight: 18, fontSize: 20, display: 'flex', alignItems: 'center', color: '#174c6f' }}>
                                        {item.icon}
                                    </span>
                                    <span className={styles.adminSidebarLabel} style={{ color: '#174c6f' }}>{item.label}</span>
                                </span>
                                <span className={styles.adminSidebarArrow} style={{ color: '#174c6f' }}>{'›'}</span>
                            </div>
                        ))}
                        <button
                            className={styles.adminHomeBtn}
                            onClick={handleLogout}
                        >
                            გასვლა
                        </button>
                    </nav>
                )}
            </aside>
            <main className={styles.adminMain}>
                <Routes>
                    <Route
                        path="categories"
                        element={
                            role === 'contragent'
                                ? <Navigate to="/admin/profile" replace />
                                : <CategoryTable />
                        }
                    />
                    <Route
                        path="products"
                        element={
                            role === 'contragent'
                                ? <Navigate to="/admin/profile" replace />
                                : <ProductsTable />
                        }
                    />
                    <Route path="requests" element={<OrderRequest />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="users" element={<Users />} />
                    <Route index element={<CategoryTable />} />
                </Routes>
            </main>
        </div>
    )
}

export default AdminPage