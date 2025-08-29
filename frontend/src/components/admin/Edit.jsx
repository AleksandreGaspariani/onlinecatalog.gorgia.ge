import React, { useState } from 'react'
import styles from '../../assets/css/Modal.module.css'
import product from '../../assets/css/ProductPage.module.css'
import Modal from './Modal'

const Edit = ({
    open,
    onClose,
    title,
    fields = [],
    onSubmit,
    submitLabel,
    splitColumns,
    children
}) => {
    const [showSuggestions, setShowSuggestions] = useState({});
    const [filteredSuggestions, setFilteredSuggestions] = useState({});

    if (!open) return null

    const handleInputChange = (field, e) => {
        if (field.suggestions && field.suggestions.length > 0) {
            const value = e.target.value;
            const words = value.trim().toLowerCase().split(' ');
            const lastWord = words[words.length - 1];
            const filtered = field.suggestions.filter(
                suggestion => suggestion.toLowerCase().startsWith(lastWord)
            );
            setFilteredSuggestions({
                ...filteredSuggestions,
                [field.name]: filtered
            });
            setShowSuggestions({
                ...showSuggestions,
                [field.name]: true
            });
        }
        field.onChange(e);
    };

    const handleSuggestionClick = (field, suggestion) => {
        const currentValue = field.value || '';
        const words = currentValue.split(' ');
        words[words.length - 1] = suggestion;
        const newValue = words.join(' ');
        const syntheticEvent = {
            target: {
                name: field.name,
                value: newValue,
                type: 'text'
            }
        };
        field.onChange(syntheticEvent);
        setShowSuggestions({
            ...showSuggestions,
            [field.name]: false
        });
    };

    const renderInput = (field) => {
        if (field.type === 'text' && field.autocomplete && field.suggestions) {
            return (
                <div style={{ position: 'relative' }}>
                    <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={field.value}
                        onChange={(e) => handleInputChange(field, e)}
                        className={product.modalFormInput}
                        autoFocus={field.autoFocus}
                        onFocus={() => {
                            if (field.value) {
                                setShowSuggestions({
                                    ...showSuggestions,
                                    [field.name]: true
                                });
                            }
                        }}
                        onBlur={() => {
                            setTimeout(() => {
                                setShowSuggestions({
                                    ...showSuggestions,
                                    [field.name]: false
                                });
                            }, 200);
                        }}
                    />
                    {showSuggestions[field.name] && filteredSuggestions[field.name] && (
                        <ul style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            border: '1px solid #ccc',
                            borderTop: 'none',
                            zIndex: 1000,
                            backgroundColor: 'white'
                        }}>
                            {filteredSuggestions[field.name].map((suggestion, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #eee'
                                    }}
                                    onClick={() => handleSuggestionClick(field, suggestion)}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        }

        return (
            <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                className={product.modalFormInput}
                autoFocus={field.autoFocus}
            />
        );
    };

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
                                                    {renderInput(left)}
                                                </>
                                            )}
                                        </div>
                                        <div style={{ marginBottom: 0, marginLeft: right ? 12 : 0 }}>
                                            {right && (
                                                <>
                                                    <label className={product.modalFormLabel} htmlFor={right.name} style={{ display: 'block', marginBottom: 5 }}>{right.label}</label>
                                                    {renderInput(right)}
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

    if (typeof children !== 'undefined') {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent} style={{ padding: '40px 32px 32px 32px', width: 520 }}>
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
                            {children}
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
            </div>
        )
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            fields={Array.isArray(fields)
                ? fields.map(field => ({
                    ...field,
                    customInput: field.autocomplete ? renderInput(field) : undefined
                }))
                : []}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
        />
    )
}

export default Edit
