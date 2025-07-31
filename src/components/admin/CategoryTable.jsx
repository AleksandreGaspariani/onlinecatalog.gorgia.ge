import React from 'react'
import styles from '../../assets/css/AdminPage.module.css'

const CategoryTable = () => (
    <div className={styles.adminTableHeader}>
        <div className={`${styles.adminTableRow} ${styles.adminTableHeaderRow}`}>
            <div className={styles.adminTableCell} style={{ width: '8%' }}>#</div>
            <div className={styles.adminTableCell} style={{ width: '28%' }}>დასახელება</div>
            <div className={styles.adminTableCell} style={{ width: '28%' }}>სურათი</div>
            <div className={styles.adminTableCell} style={{ width: '28%' }}>მოქმედება</div>
        </div>
    </div>
)

export default CategoryTable
