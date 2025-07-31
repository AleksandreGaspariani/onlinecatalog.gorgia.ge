import React from 'react'
import Table from './Table'

const columns = [
    { header: 'შეკვეთის აიდი', accessor: 'id' },
    { header: 'პროდუქტი', accessor: 'product' },
    { header: 'მოქმედება', accessor: 'actions' },
]

const OrderRequest = () => (
    <>
        <Table columns={columns} data={[]} />
    </>
)

export default OrderRequest