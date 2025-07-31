import React from 'react'
import Table from './Table'

const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'შეკვეთის სტატუსი', accessor: 'status' },
    { header: 'მიტანის თარიღი', accessor: 'deliveryDate' },
    { header: 'ელ. ფოსტა', accessor: 'email' },
    { header: 'ტელეფონი', accessor: 'phone' },
    { header: 'ნივთის ID', accessor: 'itemId' },
    { header: 'რაოდენობა', accessor: 'quantity' },
    { header: 'ფასი', accessor: 'price' },
    { header: 'ჯამი', accessor: 'total' },
    { header: 'გადახდის ტიპი', accessor: 'paymentMethod' },
]

const OrderRequest = () => (
    <>
        <Table columns={columns} data={[]} />
    </>
)

export default OrderRequest