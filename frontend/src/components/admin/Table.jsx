import React from 'react'
import styles from '../../assets/css/AdminPage.module.css'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Table = ({ columns, data, onEdit, onDelete }) => {
    const renderActions = (row) => (
        <div className={styles.actionButtons}>
            {onEdit && (
                <button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    title="Edit"
                    onClick={() => onEdit(row)}
                >
                    <FaEdit />
                </button>
            )}
            {onDelete && (
                <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
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
                        <div className={styles.adminTableCell} key={idx}>
                            {col.header}
                        </div>
                    ))}
                </div>
                {data.map((row, rowIdx) => (
                    <div className={`${styles.adminTableRow} ${styles.tableRow}`} key={rowIdx}>
                        {columns.map((col, colIdx) => (
                            <div className={styles.adminTableCell} key={colIdx}>
                                {col.cell
                                    ? col.cell(row)
                                    : col.accessor === 'actions' && (onEdit || onDelete)
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