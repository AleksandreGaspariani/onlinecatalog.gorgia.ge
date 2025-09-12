import React, { useState } from 'react'
import Modal from './Modal'
import styles from '../../assets/css/OrderRequestModal.module.css'

const cardData = [
    {
        id: 'address1',
        address1: 'თბ., ფოლ. ბირიკადი სამგორის ქუჩა წულუკიძის ქ 7',
        address2: 'ქ. თბილისი სამგორის ქუჩა წულუკიძის ქ 7',
        qty: 1,
        price: '37.95 ₾'
    },
    {
        id: 'address2',
        address1: 'თბ., ფოლ. სამგორის სამგორის ქუჩა ქ 12',
        address2: 'ქ. თბილისი სამგორის ქუჩა №12',
        qty: 1,
        price: '37.95 ₾'
    },
    {
        id: 'address3',
        address1: 'ბატ, ფოლ. სამშენებლო კომბინატის ქუჩა',
        address2: 'ქუთაისი ფილტვის ხალხმების 302',
        qty: 0,
        price: '36.5 ₾'
    }
];

const OrderRequestModal = ({ open, onClose, row }) => {
    const [date, setDate] = useState('')
    const [deliveryType, setDeliveryType] = useState('უნაღდო')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [comment, setComment] = useState('')
    const [selectedCard, setSelectedCard] = useState(cardData[0].id)

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
                    ანოტაცია:<br />
                    {row.annotation}
                </div>
                <div className={styles.orderModalQty}>
                    რაოდენობა შეკვეთაში: {row.packageCount}
                </div>
                <div className={styles.orderModalNote}>
                    თუ სტატუსი არ განახლდება მარაგი არ არის.
                </div>
            </div>

            <form className={styles.orderModalForm} onSubmit={handleSubmit}>
                <div>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: 20, flexWrap: 'wrap' }}>
                        {cardData.map(card => (
                            <div
                                key={card.id}
                                className={`${styles.orderModalCard} ${selectedCard === card.id ? styles.selectedCard : ''}`}
                                onClick={() => setSelectedCard(card.id)}
                                style={{
                                    cursor: 'pointer',
                                    border: selectedCard === card.id ? '2px solid #1976d2' : '2px solid transparent',
                                    transition: 'border 0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: 180
                                }}
                            >
                                <div>
                                    <div><b>მისამართი:</b> {card.address1}</div>
                                    <div><b>მისამართი:</b> {card.address2}</div>
                                    <div><b>რაოდენობა:</b> {card.qty}</div>
                                    <div><b>ფასი:</b> {card.price}</div>
                                </div>
                                <div style={{ marginTop: 12 }}>
                                    <input
                                        type="radio"
                                        name="address"
                                        id={card.id}
                                        checked={selectedCard === card.id}
                                        onChange={() => setSelectedCard(card.id)}
                                        style={{ accentColor: '#1976d2' }}
                                    />
                                    <label htmlFor={card.id} style={{ marginLeft: 4, color: '#888', cursor: 'pointer' }}>არჩევა</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.orderModalRow}>
                    <div className={styles.orderModalCol}>
                        <label>მიწოდების თარიღი</label>
                        <input
                            type="date"
                            required
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
                            <option value="უნაღდო">უნაღდო</option>
                        </select>
                    </div>
                </div>
                <div className="">

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
