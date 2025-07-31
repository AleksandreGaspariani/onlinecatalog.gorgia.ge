import React from 'react'
import styles from '../../assets/css/AdminPage.module.css'

const ProductTable = () => (
    <div className={styles.adminTableWrapper}>
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
        <div className={styles.adminTableBody}>
            {/* Пример строки, замените на map по данным */}
            <div className={styles.adminTableRow}>
                <div className={styles.adminTableCell} style={{ width: '4%' }}>1</div>
                <div className={styles.adminTableCell} style={{ width: '10%' }}>მაგალითი</div>
                <div className={styles.adminTableCell} style={{ width: '10%' }}>სახელი</div>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>100₾</div>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>BM-000000</div>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>12345</div>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>20099999891215</div>
                <div className={styles.adminTableCell} style={{ width: '6%' }}>1x1</div>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>10</div>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>მწარმოებელი</div>
                <div className={styles.adminTableCell} style={{ width: '10%' }}>ანოტაცია</div>
                <div className={styles.adminTableCell} style={{ width: '10%' }}>img.jpg</div>
                <div className={styles.adminTableCell} style={{ width: '8%' }}>რედაქტირება | წაშლა</div>
            </div>
        </div>
    </div>
)

export default ProductTable
