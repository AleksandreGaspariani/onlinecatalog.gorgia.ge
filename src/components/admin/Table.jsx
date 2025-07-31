import React from 'react'
import styles from '../../assets/css/AdminPage.module.css'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Table = ({ columns, data, onEdit, onDelete, actions }) => {
    const hasActionsColumn = columns.some(col => col.accessor === 'actions')

    const renderActions = (row) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {onEdit && (
                <button
                    style={{
                        background: '#e0e5eb',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        color: '#1976d2'
                    }}
                    title="Edit"
                    onClick={() => onEdit(row)}
                >
                    <FaEdit />
                </button>
            )}
            {onDelete && (
                <button
                    style={{
                        background: '#ffeaea',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        color: '#d32f2f'
                    }}
                    title="Delete"
                    onClick={() => onDelete(row)}
                >
                    <FaTrash />
                </button>
            )}
        </div>
    )

    return (
        <div className={styles.adminTableWrapper}>
            <div className={styles.adminTableInner}>
                <div className={`${styles.adminTableRow} ${styles.adminTableHeaderRow}`}>
                    {columns.map((col, idx) => (
                        <div className={styles.adminTableCell} key={idx}>{col.header}</div>
                    ))}
                </div>
                {data.map((row, rowIdx) => (
                    <div className={styles.adminTableRow} key={rowIdx}>
                        {columns.map((col, colIdx) => (
                            <div className={styles.adminTableCell} key={colIdx}>
                                {col.accessor === 'actions' && (onEdit || onDelete)
                                    ? renderActions(row)
                                    : row[col.accessor]
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Table