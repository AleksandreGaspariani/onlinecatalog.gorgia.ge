import React from 'react'
import styles from '../../assets/css/Modal.module.css'

const DeleteModal = ({ open, onClose, onConfirm, title, message }) => {
    if (!open) return null

    return (
        <div className={styles.modalOverlay}>
            <div
                className={styles.modalContent}
                style={{
                    maxWidth: 420,
                    borderRadius: 18,
                    boxShadow: '0 8px 32px rgba(44,62,80,0.18)',
                    padding: '36px 32px 28px 32px',
                    textAlign: 'center'
                }}
            >
                <div
                    className={styles.modalHeader}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 12,
                        position: 'relative'
                    }}
                >
                    <h2
                        className={styles.modalTitle}
                        style={{
                            fontSize: 22,
                            fontWeight: 600,
                            margin: 0,
                            flex: 1,
                            textAlign: 'left'
                        }}
                    >
                        {title || 'დასტური'}
                    </h2>
                    <button
                        className={styles.modalCloseBtn}
                        onClick={onClose}
                        aria-label="Close"
                        style={{
                            fontSize: 26,
                            color: '#888',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            lineHeight: 1,
                            marginLeft: 16
                        }}
                    >
                        ×
                    </button>
                </div>
                <div className={styles.modalBody} style={{ margin: '2.5rem 0 0 0', padding: 0 }}>
                    <p style={{ fontSize: 16, color: '#222', margin: 0, marginBottom: 32 }}>
                        {message || 'ნამდვილად გსურთ წაშლა?'}
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 16,
                        marginTop: 0
                    }}>
                        <button
                            onClick={onClose}
                            style={{
                                background: '#f5f5f5',
                                color: '#888',
                                border: 'none',
                                borderRadius: 8,
                                padding: '10px 32px',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'background 0.2s, color 0.2s'
                            }}
                            onMouseOver={e => { e.currentTarget.style.background = '#e0e0e0'; e.currentTarget.style.color = '#555'; }}
                            onMouseOut={e => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#888'; }}
                        >
                            გაუქმება
                        </button>
                        <button
                            onClick={onConfirm}
                            style={{
                                background: '#d32f2f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '10px 32px',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={e => { e.currentTarget.style.background = '#b71c1c'; }}
                            onMouseOut={e => { e.currentTarget.style.background = '#d32f2f'; }}
                        >
                            წაშლა
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
