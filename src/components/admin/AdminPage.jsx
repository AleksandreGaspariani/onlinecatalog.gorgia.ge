import React, { useState } from 'react'
import styles from '../../assets/css/AdminPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTab } from '../../store/adminSlice'
import CategoryTable from './CategoryTable'
import ProductTable from './ProductTable'
import OrderRequest from './OrderRequestTable'
import Orders from './OrdersTable'
import Profile from './ProfileTable'
import Users from './UsersTable'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaThList, FaBoxOpen, FaClipboardList, FaShoppingCart, FaUserCircle, FaUsers } from 'react-icons/fa'

const sidebarItems = [
    { label: 'მთავარი', key: 'main', icon: <FaHome /> },
    { label: 'კატეგორიები', key: 'categories', icon: <FaThList /> },
    { label: 'პროდუქტები', key: 'products', icon: <FaBoxOpen /> },
    { label: 'შეკვეთების მოთხოვნები', key: 'requests', icon: <FaClipboardList /> },
    { label: 'შეკვეთები', key: 'orders', icon: <FaShoppingCart /> },
    { label: 'პროფილი', key: 'profile', icon: <FaUserCircle /> },
    { label: 'მომხმარებლები', key: 'users', icon: <FaUsers /> },
];

const AdminPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const selectedTab = useSelector(state => state.admin.selectedTab)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                        <span className={styles.adminCatalogTitle}>Catalog</span>
                    )}
                </div>
                {sidebarOpen && (
                    <nav className={styles.adminSidebarNav}>
                        {sidebarItems.map((item, idx) => (
                            <div
                                className={styles.adminSidebarItem}
                                key={idx}
                                style={{
                                    background: selectedTab === item.key ? '#e0e5eb85' : undefined,
                                    fontWeight: selectedTab === item.key ? 'bold' : undefined,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                onClick={() => {
                                    if (item.key === 'main') {
                                        navigate('/')
                                    } else {
                                        dispatch(setSelectedTab(item.key))
                                    }
                                }}
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
                        <button className={styles.adminHomeBtn}>
                            გასვლა
                        </button>
                    </nav>
                )}
            </aside>
            <main className={styles.adminMain}>
                {selectedTab === 'categories' && <CategoryTable />}
                {selectedTab === 'products' && <ProductTable />}
                {selectedTab === 'requests' && <OrderRequest />}
                {selectedTab === 'orders' && <Orders />}
                {selectedTab === 'profile' && <Profile />}
                {selectedTab === 'users' && <Users />}
            </main>
        </div>
    )
}

export default AdminPage