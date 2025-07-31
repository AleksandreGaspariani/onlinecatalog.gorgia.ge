import React from 'react'
import styles from '../../assets/css/Modal.module.css'
import product from '../../assets/css/ProductPage.module.css'

const Modal = ({ open, onClose, title, children, fields, onSubmit, submitLabel }) => {
    if (!open) return null

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
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
                    {fields ? (
                        <form
                            className={product.modalForm}
                            onSubmit={onSubmit}
                        >
                            {fields.map((field, idx) => (
                                <React.Fragment key={field.name || idx}>
                                    <label
                                        className={product.modalFormLabel}
                                        htmlFor={field.name}
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type}
                                        value={field.value}
                                        onChange={field.onChange}
                                        className={product.modalFormInput}
                                        autoFocus={field.autoFocus}
                                    />
                                </React.Fragment>
                            ))}
                            <button
                                type="submit"
                                className={product.modalFormBtn}
                                style={{ marginTop: '12px' }}
                            >
                                {submitLabel || 'Submit'}
                            </button>
                        </form>
                    ) : children}
                </div>
            </div>
        </div>
    )
}

export default Modal
