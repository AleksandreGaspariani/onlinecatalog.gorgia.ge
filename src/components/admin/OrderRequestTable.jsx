import React, { useState } from 'react'
import Table from './Table'
import OrderRequestModal from './OrderRequestModal'

const columns = [
    { header: 'შეკვეთის აიდი', accessor: 'id' },
    { header: 'პროდუქტი', accessor: 'product' },
    { header: 'მოქმედება', accessor: 'actions' },
]

const data = [
    {
        id: 1,
        product: 'პროდუქტი 1',
    }
]

const OrderRequest = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)

    const handleOrderClick = (row) => {
        setSelectedRow(row)
        setModalOpen(true)
    }

    const tableData = data.map(row => ({
        ...row,
        actions: (
            <button
                style={{
                    background: '#017dbe',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 18px',
                    cursor: 'pointer'
                }}
                onClick={() => handleOrderClick(row)}
            >
                შეკვეთა
            </button>
        )
    }))

    return (
        <>
            <Table
                columns={columns}
                data={tableData}
            />
            <OrderRequestModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                row={selectedRow}
            />
        </>
    )
}

export default OrderRequest