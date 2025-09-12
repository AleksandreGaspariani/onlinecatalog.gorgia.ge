import React, { useState, useRef, useEffect } from 'react'
import styles from '../../assets/css/Modal.module.css'
import product from '../../assets/css/ProductPage.module.css'
import { MdKeyboardArrowDown, MdDone } from "react-icons/md";

const Modal = ({ open, onClose, title, children, fields, onSubmit, submitLabel }) => {
    if (!open) return null

    const [dropdownOpen, setDropdownOpen] = useState({});
    const dropdownRefs = useRef({});

    useEffect(() => {
        function handleClickOutside(event) {
            Object.keys(dropdownRefs.current).forEach(name => {
                if (dropdownRefs.current[name] && !dropdownRefs.current[name].contains(event.target)) {
                    setDropdownOpen(prev => ({ ...prev, [name]: false }));
                }
            });
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                                    {field.type === 'file' ? (
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type="file"
                                            onChange={field.onChange}
                                            className={product.modalFormInput}
                                            autoFocus={field.autoFocus}
                                            multiple={field.multiple}
                                            accept='image/*'
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            className={product.modalFormInput}
                                        >
                                            <option value="">აირჩიეთ როლი</option>
                                            {field.options && field.options.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'multiselect' ? (
                                        <div style={{ position: 'relative' }} ref={el => dropdownRefs.current[field.name] = el}>
                                            <div
                                                className={product.modalFormInput}
                                                style={{ cursor: 'pointer', minHeight: 38, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '0 12px', color: (!field.value || field.value.length === 0) ? '#888' : '#222', fontWeight: (!field.value || field.value.length === 0) ? 400 : 500, transition: 'border 0.18s, box-shadow 0.18s' }}
                                                onClick={() => setDropdownOpen(prev => ({ ...prev, [field.name]: !prev[field.name] }))}
                                            >
                                                {field.options && field.value && field.value.length > 0
                                                    ? field.options.filter(opt => field.value.includes(opt.value)).map(opt => opt.label).join(', ')
                                                    : <span style={{ color: '#888' }}>აირჩიეთ კატეგორიები</span>}
                                                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}><MdKeyboardArrowDown fontSize={20} /></span>
                                            </div>
                                            {dropdownOpen[field.name] && (
                                                <div className={product.multiselectDropdown} style={{ minWidth: 220 }}>
                                                    {field.options && field.options.map(opt => {
                                                        const isChecked = Array.isArray(field.value) && field.value.map(String).includes(String(opt.value));
                                                        return (
                                                            <label
                                                                key={opt.value}
                                                                className={product.multiselectOption + (isChecked ? ' ' + product.selectedLabel : '')}
                                                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative', paddingRight: 32 }}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    onChange={e => {
                                                                        let newValue = Array.isArray(field.value) ? field.value.map(String) : [];
                                                                        const optVal = String(opt.value);
                                                                        if (e.target.checked) {
                                                                            if (!newValue.includes(optVal)) newValue.push(optVal);
                                                                        } else {
                                                                            newValue = newValue.filter(v => v !== optVal);
                                                                        }
                                                                        field.onChange({
                                                                            target: {
                                                                                name: field.name,
                                                                                value: newValue
                                                                            }
                                                                        });
                                                                    }}
                                                                    className={product.customCheckbox}
                                                                />
                                                                {opt.label}
                                                                {isChecked && (
                                                                    <span style={{ position: 'absolute', right: 12, color: '#017dbe', display: 'flex', alignItems: 'center' }}>
                                                                        <MdDone fontSize={18} />
                                                                    </span>
                                                                )}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            value={field.value}
                                            onChange={field.onChange}
                                            className={product.modalFormInput}
                                            autoFocus={field.autoFocus}
                                        />
                                    )}
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
