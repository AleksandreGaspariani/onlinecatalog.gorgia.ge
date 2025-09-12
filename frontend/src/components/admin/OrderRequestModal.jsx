import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from './Modal'
import styles from '../../assets/css/OrderRequestModal.module.css'
import { toast } from 'react-hot-toast'
import { OrbitProgress } from "react-loading-indicators";

const OrderRequestModal = ({ open, onClose, row }) => {
    const [date, setDate] = useState('')
    const [deliveryType, setDeliveryType] = useState('უნაღდო')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [comment, setComment] = useState('')
    const [warehouses, setWarehouses] = useState([])
    const [selectedCard, setSelectedCard] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (open && row?.bmCode) {
            setLoading(true)
            axios.post('https://back.gorgia.ge/api/online_catalog/product', {
                token: '$2y$12$dyqm74uwPn/FE674dAwba.fWgwMLcPI5ip4dSTNcH2neDl1Jk0Fni',
                bm_code: row.bmCode
            })
                .then(response => {
                    const warehouses = response.data?.data?.warehouses || []
                    setWarehouses(warehouses)
                    if (warehouses.length > 0) {
                        setSelectedCard(warehouses[0].warehouse_id)
                    } else {
                        setSelectedCard(null)
                    }
                })
                .catch(error => {
                    setWarehouses([])
                    setSelectedCard(null)
                    toast.error('საწყობების მონაცემების მიღება ვერ მოხერხდა!')
                })
                .finally(() => setLoading(false))
        } else {
            setWarehouses([])
            setSelectedCard(null)
        }
    }, [open, row])

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
                        {loading ? (
                            <div className={styles.spinnerWrapper}>
                                <OrbitProgress variant="track-disc" dense color="#1976d2" size="small" text="" textColor="#ff0000" />
                            </div>
                        ) : (
                            <>
                                {warehouses.length === 0 && (
                                    <div style={{ color: '#888', fontStyle: 'italic' }}>საწყობი ვერ მოიძებნა ან არ არის მარაგი.</div>
                                )}
                                {warehouses.map(card => {
                                    const isDisabled = card.stock === 0;
                                    return (
                                        <div
                                            key={card.warehouse_id}
                                            className={`${styles.orderModalCard} ${selectedCard === card.warehouse_id ? styles.selectedCard : ''}`}
                                            onClick={() => {
                                                if (isDisabled) {
                                                    toast.error('ამ საწყობში არ არის რაოდენობა');
                                                } else {
                                                    setSelectedCard(card.warehouse_id)
                                                }
                                            }}
                                            style={{
                                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                                border: selectedCard === card.warehouse_id ? '2px solid #1976d2' : '2px solid transparent',
                                                opacity: isDisabled ? 0.5 : 1,
                                                transition: 'border 0.2s, opacity 0.2s',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                minHeight: 180
                                            }}
                                        >
                                            <div>
                                                <div><b>საწყობი:</b> {card.warehouse_name || '-'}</div>
                                                <div><b>მისამართი:</b> {card.warehouse_address || '-'}</div>
                                                <div><b>რაოდენობა:</b> {card.stock}</div>
                                                <div><b>ფასი:</b> {card.price} ₾</div>
                                            </div>
                                            <div style={{ marginTop: 12 }}>
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    id={card.warehouse_id}
                                                    checked={selectedCard === card.warehouse_id}
                                                    onChange={() => setSelectedCard(card.warehouse_id)}
                                                    style={{ accentColor: '#1976d2' }}
                                                    disabled={isDisabled}
                                                />
                                                <label htmlFor={card.warehouse_id} style={{ marginLeft: 4, color: '#888', cursor: isDisabled ? 'not-allowed' : 'pointer' }}>არჩევა</label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        )}
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
