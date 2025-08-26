import React from 'react'
import styles from '../../assets/css/Modal.module.css'
import product from '../../assets/css/ProductPage.module.css'
import Modal from './Modal'

const Edit = ({ open, onClose, title, fields, onSubmit, submitLabel, splitColumns }) => {
    if (!open) return null

    if (splitColumns && Array.isArray(fields)) {
        const rows = []
        for (let i = 0; i < fields.length; i += 2) {
            rows.push([fields[i], fields[i + 1] || null])
        }
        return (
            <div className={styles.modalOverlay}>
                <div
                    className={styles.modalContent}
                    style={{ padding: '40px 32px 32px 32px', width: 520 }}
                >
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
                        <form onSubmit={onSubmit} className={product.modalForm}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {rows.map(([left, right], idx) => (
                                    <React.Fragment key={idx}>
                                        <div style={{ marginBottom: 0, marginLeft: left ? 12 : 0 }}>
                                            {left && (
                                                <>
                                                    <label className={product.modalFormLabel} htmlFor={left.name} style={{ display: 'block', marginBottom: 5 }}>{left.label}</label>
                                                    <input
                                                        id={left.name}
                                                        name={left.name}
                                                        type={left.type}
                                                        value={left.value}
                                                        onChange={left.onChange}
                                                        className={product.modalFormInput}
                                                        autoFocus={left.autoFocus}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        <div style={{ marginBottom: 0, marginLeft: right ? 12 : 0 }}>
                                            {right && (
                                                <>
                                                    <label className={product.modalFormLabel} htmlFor={right.name} style={{ display: 'block', marginBottom: 5 }}>{right.label}</label>
                                                    <input
                                                        id={right.name}
                                                        name={right.name}
                                                        type={right.type}
                                                        value={right.value}
                                                        onChange={right.onChange}
                                                        className={product.modalFormInput}
                                                        autoFocus={right.autoFocus}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </React.Fragment>
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
                    </div>
                </div>
            </div >
        )
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            fields={fields}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
        />
    )
}

export default Edit
