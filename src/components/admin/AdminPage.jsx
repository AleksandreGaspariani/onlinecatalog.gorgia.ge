import React, { useState } from 'react'
import styles from '../../assets/css/AdminPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTab } from '../../store/adminSlice'
import CategoryTable from './CategoryTable'
import ProductTable from './ProductTable'
import OrderRequest from './OrderRequest'
import Orders from './Orders'
import Profile from './Profile'
import Users from './Users'

const sidebarItems = [
    { label: 'კატეგორიები', key: 'categories' },
    { label: 'პროდუქტები', key: 'products' },
    { label: 'შესყიდვის მოთხოვნები', key: 'requests' },
    { label: 'შეკვეთები', key: 'orders' },
    { label: 'პროფილი', key: 'profile' },
    { label: 'მომხმარებლები', key: 'users' },
];

const AdminPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const selectedTab = useSelector(state => state.admin.selectedTab)
    const dispatch = useDispatch()

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
                                    fontWeight: selectedTab === item.key ? 'bold' : undefined
                                }}
                                onClick={() => dispatch(setSelectedTab(item.key))}
                            >
                                <span className={styles.adminSidebarLabel}>{item.label}</span>
                                <span className={styles.adminSidebarArrow}>{'›'}</span>
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