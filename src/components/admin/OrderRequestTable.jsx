import React from 'react'
import Table from './Table'

const columns = [
    { header: 'შეკვეთის აიდი', accessor: 'id' },
    { header: 'პროდუქტი', accessor: 'product' },
    { header: 'მოქმედება', accessor: 'actions' },
]

const data = [
    {
        id: 1,
        product: 'პროდუქტი 1',
        actions: 'დამატება | წაშლა'
    }
]

const OrderRequest = () => {

    return (
        <>
            <Table
                columns={columns}
                data={data}
            />

        </>
    )
}

export default OrderRequest