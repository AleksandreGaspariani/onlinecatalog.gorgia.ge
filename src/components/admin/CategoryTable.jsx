import React from 'react'
import styles from '../../assets/css/AdminPage.module.css'

const CategoryTable = () => (
    <div className={styles.adminTableWrapper}>
        <div className={styles.adminTableInner}>
            <div className={`${styles.adminTableRow} ${styles.adminTableHeaderRow}`}>
                <div className={styles.adminTableCell}>#</div>
                <div className={styles.adminTableCell}>დასახელება</div>
                <div className={styles.adminTableCell}>სურათი</div>
                <div className={styles.adminTableCell}>მოქმედება</div>
            </div>
            <div className={styles.adminTableRow}>
                <div className={styles.adminTableCell}>1</div>
                <div className={styles.adminTableCell}>მაგალითი კატეგორია</div>
                <div className={styles.adminTableCell}>img.jpg</div>
                <div className={styles.adminTableCell}>რედაქტირება | წაშლა</div>
            </div>
        </div>
    </div>
)

export default CategoryTable