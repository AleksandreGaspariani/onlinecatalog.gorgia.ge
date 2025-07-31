import React from 'react'
import styles from '../../assets/css/AdminPage.module.css'

const CategoryTable = () => (
    <div className={styles.adminTableWrapper}>
        <div className={styles.adminTableHeader}>
            <div className={`${styles.adminTableRow} ${styles.adminTableHeaderRow}`}>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>#</div>
                <div className={styles.adminTableCell} style={{ width: '28%' }}>დასახელება</div>
                <div className={styles.adminTableCell} style={{ width: '28%' }}>სურათი</div>
                <div className={styles.adminTableCell} style={{ width: '28%' }}>მოქმედება</div>
            </div>
        </div>
        <div className={styles.adminTableBody}>
            {/* Пример строки, замените на map по данным */}
            <div className={styles.adminTableRow}>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>1</div>
                <div className={styles.adminTableCell} style={{ width: '28%' }}>მაგალითი კატეგორია</div>
                <div className={styles.adminTableCell} style={{ width: '28%' }}>img.jpg</div>
                <div className={styles.adminTableCell} style={{ width: '28%' }}>რედაქტირება | წაშლა</div>
            </div>
        </div>
    </div>
)

export default CategoryTable