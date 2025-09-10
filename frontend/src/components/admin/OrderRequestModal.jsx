import React, { useState } from 'react'
import Modal from './Modal'
import styles from '../../assets/css/OrderRequestModal.module.css'

const OrderRequestModal = ({ open, onClose, row }) => {
    const [date, setDate] = useState('')
    const [deliveryType, setDeliveryType] = useState('უნაკლო')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onClose()
    }

    if (!row) return null;

    return (
        <Modal open={open} onClose={onClose} title="დეტალები">
            <div className={styles.orderModalHeader}>
                <div className={styles.orderModalTitle}>
                    {row.numerologicalName}
                </div>
                <div className={styles.orderModalCode}>
                    კოდი: {row.bmCode}
                </div>
                <div className={styles.orderModalDesc}>
                    აღწერა:<br />
                    {row.description}
                </div>
                <div className={styles.orderModalQty}>
                    რაოდენობა შეკვეთაში: {row.quantity}
                </div>
                <div className={styles.orderModalNote}>
                    თუ სტატუსი არ განახლდება მარაგი არ არის.
                </div>
            </div>

            <form className={styles.orderModalForm} onSubmit={handleSubmit}>
                <div className={styles.orderModalRow}>
                    <div className={styles.orderModalCol}>
                        <label>მიწოდების თარიღი</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className={styles.orderModalInput}
                            placeholder="mm/dd/yyyy"
                        />
                    </div>
                    <div className={styles.orderModalCol}>
                        <label>გადაცემის მეთოდი</label>
                        <select
                            value={deliveryType}
                            onChange={e => setDeliveryType(e.target.value)}
                            className={styles.orderModalInput}
                        >
                            <option value="უნაკლო">უნაკლო</option>
                            <option value="სხვა">სხვა</option>
                        </select>
                    </div>
                </div>
                <div className={styles.orderModalRow}>
                    <div className={styles.orderModalCol}>
                        <label>ერთეულის ფასი</label>
                        <input
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className={styles.orderModalInput}
                        />
                    </div>
                    <div className={styles.orderModalCol}>
                        <label>რაოდენობა</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            className={styles.orderModalInput}
                        />
                    </div>
                </div>
                <div className={styles.orderModalRow}>
                    <div className={styles.orderModalColFull}>
                        <label>კომენტარი</label>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            className={styles.orderModalTextarea}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={styles.orderModalBtn}
                >
                    შეკვეთა
                </button>
            </form>
        </Modal>
    )
}

export default OrderRequestModal
