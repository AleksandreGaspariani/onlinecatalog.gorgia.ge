import React from 'react'
import styles from '../../assets/css/AdminPage.module.css'

const ProductTable = () => (
    <div className={styles.adminTableHeader}>
        <div className={`${styles.adminTableRow} ${styles.adminTableHeaderRow}`}>
            <div className={styles.adminTableCell} style={{ width: '4%' }}>#</div>
            <div className={styles.adminTableCell} style={{ width: '10%' }}>კატეგორია</div>
            <div className={styles.adminTableCell} style={{ width: '10%' }}>ნუმეროლოგიური სახელი</div>
            <div className={styles.adminTableCell} style={{ width: '8%' }}>ღირებულება</div>
            <div className={styles.adminTableCell} style={{ width: '8%' }}>BM კოდი</div>
            <div className={styles.adminTableCell} style={{ width: '8%' }}>არტიკული</div>
            <div className={styles.adminTableCell} style={{ width: '8%' }}>შტრიხკოდი</div>
            <div className={styles.adminTableCell} style={{ width: '6%' }}>ზომა</div>
            <div className={styles.adminTableCell} style={{ width: '8%' }}>პაკეტის რაოდენობა</div>
            <div className={styles.adminTableCell} style={{ width: '8%' }}>მწარმოებელი</div>
            <div className={styles.adminTableCell} style={{ width: '10%' }}>ანოტაცია</div>
            <div className={styles.adminTableCell} style={{ width: '10%' }}>სურათები</div>
            <div className={styles.adminTableCell} style={{ width: '8%' }}>ქმედებები</div>
        </div>
    </div>
)

export default ProductTable
