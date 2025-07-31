import React from 'react'
import styles from '../../assets/css/AdminPage.module.css'

const Table = ({ columns, data, actions }) => (
    <div className={styles.adminTableWrapper}>
        <div className={styles.adminTableInner}>
            <div className={`${styles.adminTableRow} ${styles.adminTableHeaderRow}`}>
                {columns.map((col, idx) => (
                    <div className={styles.adminTableCell} key={idx}>{col.header}</div>
                ))}
                {actions && <div className={styles.adminTableCell}>მოქმედება</div>}
            </div>
            {data.map((row, rowIdx) => (
                <div className={styles.adminTableRow} key={rowIdx}>
                    {columns.map((col, colIdx) => (
                        <div className={styles.adminTableCell} key={colIdx}>
                            {row[col.accessor]}
                        </div>
                    ))}
                    {actions && (
                        <div className={styles.adminTableCell}>
                            {actions(row)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
)

export default Table