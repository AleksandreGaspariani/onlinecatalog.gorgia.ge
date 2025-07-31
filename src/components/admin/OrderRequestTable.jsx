import React, { useState } from 'react'
import Table from './Table'
import Edit from './Edit'

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
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editForm, setEditForm] = useState({ product: '' })

    const handleEdit = (row) => {
        setEditForm({ product: row.product || '' })
        setEditModalOpen(true)
    }
    const handleDelete = (row) => {
        if (window.confirm(`Delete request: ${row.product}?`)) {
            alert('Deleted!')
        }
    }

    const handleEditChange = e => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditSubmit = e => {
        e.preventDefault()
        alert('Edited request: ' + JSON.stringify(editForm))
        setEditModalOpen(false)
    }

    const editFields = [
        { label: 'პროდუქტი', type: 'text', name: 'product', value: editForm.product, onChange: handleEditChange }
    ]

    return (
        <>
            <Table
                columns={columns}
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <Edit
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="მოთხოვნის რედაქტირება"
                fields={editFields}
                onSubmit={handleEditSubmit}
                submitLabel="შენახვა"
            />
        </>
    )
}

export default OrderRequest