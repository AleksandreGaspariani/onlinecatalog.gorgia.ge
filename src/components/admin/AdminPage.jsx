import React, { useState } from 'react'
import styles from '../../assets/css/AdminPage.module.css'

const sidebarItems = [
    { label: 'კატეგორიები', },
    { label: 'პროდუქტები' },
    { label: 'შესყიდვის მოთხოვნები' },
    { label: 'შეკვეთები' },
    { label: 'პროფილი' },
    { label: 'მომხმარებლები' },
];

const AdminPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
                        ≡
                    </button>
                    {sidebarOpen && (
                        <span className={styles.adminCatalogTitle}>Catalog</span>
                    )}
                </div>
                {sidebarOpen && (
                    <nav className={styles.adminSidebarNav}>
                        {sidebarItems.map((item, idx) => (
                            <div className={styles.adminSidebarItem} key={idx}>
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
                <div className={styles.adminTableHeader}>
                    <div className={`${styles.adminTableRow} ${styles.adminTableHeaderRow}`}>
                        <div className={styles.adminTableCell} style={{ width: '8%' }}>#</div>
                        <div className={styles.adminTableCell} style={{ width: '28%' }}>დასახელება</div>
                        <div className={styles.adminTableCell} style={{ width: '28%' }}>სურათი</div>
                        <div className={styles.adminTableCell} style={{ width: '28%' }}>მოქმედება</div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminPage