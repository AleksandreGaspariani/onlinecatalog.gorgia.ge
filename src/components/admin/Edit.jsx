import React from 'react'
import Modal from './Modal'
import styles from '../../assets/css/Modal.module.css'
import product from '../../assets/css/ProductPage.module.css'

const modalStyle = {
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    margin: '40px auto',
    borderRadius: '12px'
}

const Edit = ({ open, onClose, title, fields, onSubmit, submitLabel, splitColumns }) => {
    if (!open) return null

    let leftFields = fields, rightFields = []
    if (splitColumns && Array.isArray(fields)) {
        const mid = Math.ceil(fields.length / 2)
        leftFields = fields.slice(0, mid)
        rightFields = fields.slice(mid)
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={modalStyle}>
                <div className={styles.modalHeader}>
                    {title && <h2 className={styles.modalTitle}>{title}</h2>}
                    <button
                        className={styles.modalCloseBtn}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {splitColumns ? (
                        <form onSubmit={onSubmit} className={product.modalForm} style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                {leftFields.map((field, idx) => (
                                    <div key={field.name || idx} style={{ marginBottom: 12 }}>
                                        <label className={product.modalFormLabel} htmlFor={field.name} style={{ display: 'block', marginBottom: 4 }}>{field.label}</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            value={field.value}
                                            onChange={field.onChange}
                                            className={product.modalFormInput}
                                            autoFocus={field.autoFocus}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                {rightFields.map((field, idx) => (
                                    <div key={field.name || idx} style={{ marginBottom: 12 }}>
                                        <label className={product.modalFormLabel} htmlFor={field.name} style={{ display: 'block', marginBottom: 4 }}>{field.label}</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            value={field.value}
                                            onChange={field.onChange}
                                            className={product.modalFormInput}
                                            autoFocus={field.autoFocus}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                className={product.modalFormBtn}
                                style={{ width: '100%', marginTop: 12 }}
                            >
                                {submitLabel || 'Save'}
                            </button>
                        </form>
                    ) : (
                        <Modal
                            open={true}
                            onClose={onClose}
                            title={title}
                            fields={fields}
                            onSubmit={onSubmit}
                            submitLabel={submitLabel || 'Save'}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Edit
