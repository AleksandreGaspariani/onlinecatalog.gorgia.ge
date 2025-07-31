import React, { useState } from 'react'
import Table from './Table'
import Edit from './Edit'
const columns = [
    { header: '#', accessor: 'id' },
    { header: 'დასახელება', accessor: 'name' },
    { header: 'სურათი', accessor: 'image' },
    { header: 'მოქმედება', accessor: 'actions' }
]

const data = [
    { id: 1, name: 'მაგალითი კატეგორია', image: 'img.jpg', actions: 'რედაქტირება | წაშლა' }
]

const CategoryTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [editForm, setEditForm] = useState({ id: '', name: '', image: '' })

    const handleEdit = (row) => {
        setEditForm({ id: row.id, name: row.name, image: row.image })
        setModalOpen(true)
    }
    const handleDelete = (row) => {
        if (window.confirm(`Delete category: ${row.name}?`)) {
            alert('Deleted!')
        }
    }

    const handleEditChange = e => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditSubmit = e => {
        e.preventDefault()
        alert('Edited category: ' + JSON.stringify(editForm))
        setModalOpen(false)
    }

    const editFields = [
        { label: 'დასახელება', type: 'text', name: 'name', value: editForm.name, onChange: handleEditChange },
        { label: 'სურათი', type: 'text', name: 'image', value: editForm.image, onChange: handleEditChange }
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
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="კატეგორიის რედაქტირება"
                fields={editFields}
                onSubmit={handleEditSubmit}
                submitLabel="შენახვა"
            />
        </>
    )
}

export default CategoryTable