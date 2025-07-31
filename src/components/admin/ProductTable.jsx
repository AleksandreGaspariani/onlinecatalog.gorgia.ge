import React, { useState } from 'react'
import styles from '../../assets/css/AdminPage.module.css'
import product from '../../assets/css/ProductPage.module.css'
import Modal from './Modal'

const ProductTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [productCode, setProductCode] = useState('')

    return (
        <>
            <button
                className={product.addProductBtn}
                onClick={() => setModalOpen(true)}
            >
                პროდუქტის დამატება 1c დან
            </button>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="პროდუქტის დამატება"
            >
                <form
                    className={product.modalForm}
                    onSubmit={e => {
                        e.preventDefault()
                    }}
                >
                    <label
                        htmlFor="productCode"
                        className={product.modalFormLabel}
                    >
                        პროდუქტის კოდი
                    </label>
                    <input
                        id="productCode"
                        type="text"
                        value={productCode}
                        onChange={e => setProductCode(e.target.value)}
                        className={product.modalFormInput}
                        autoFocus
                    />
                    <button
                        type="submit"
                        className={product.modalFormBtn}
                    >
                        დამატება
                    </button>
                </form>
            </Modal>

            <div className={styles.adminTableWrapper}>
                <div className={styles.adminTableInner}>
                    <div className={`${styles.adminTableRow} ${styles.adminTableHeaderRow}`}>
                        <div className={styles.adminTableCell}>#</div>
                        <div className={styles.adminTableCell}>კატეგორია</div>
                        <div className={styles.adminTableCell}>ნუმეროლოგიური სახელი</div>
                        <div className={styles.adminTableCell}>ღირებულება</div>
                        <div className={styles.adminTableCell}>BM კოდი</div>
                        <div className={styles.adminTableCell}>არტიკული</div>
                        <div className={styles.adminTableCell}>შტრიხკოდი</div>
                        <div className={styles.adminTableCell}>ზომა</div>
                        <div className={styles.adminTableCell}>პაკეტის რაოდენობა</div>
                        <div className={styles.adminTableCell}>მწარმოებელი</div>
                        <div className={styles.adminTableCell}>ანოტაცია</div>
                        <div className={styles.adminTableCell}>სურათები</div>
                        <div className={styles.adminTableCell}>ქმედებები</div>
                    </div>
                    <div className={styles.adminTableRow}>
                        <div className={styles.adminTableCell}>1</div>
                        <div className={styles.adminTableCell}>მაგალითი</div>
                        <div className={styles.adminTableCell}>სახელი</div>
                        <div className={styles.adminTableCell}>100₾</div>
                        <div className={styles.adminTableCell}>BM-000000</div>
                        <div className={styles.adminTableCell}>12345</div>
                        <div className={styles.adminTableCell}>20099999891215asdasdasdasdsad</div>
                        <div className={styles.adminTableCell}>1x1</div>
                        <div className={styles.adminTableCell}>10</div>
                        <div className={styles.adminTableCell}>მწარმოებელი</div>
                        <div className={styles.adminTableCell}>ანოტაცია</div>
                        <div className={styles.adminTableCell}>img.jpg</div>
                        <div className={styles.adminTableCell}>რედაქტირება | წაშლა</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductTable