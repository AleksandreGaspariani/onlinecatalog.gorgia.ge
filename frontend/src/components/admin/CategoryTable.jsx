import React, { useState } from 'react'
import product from '../../assets/css/ProductPage.module.css'
import Table from './Table'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
import ImagePreviewModal from './ImagePreviewModal'



const CategoryTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [editForm, setEditForm] = useState({ id: '', name: '', image: '' })
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [rowToDelete, setRowToDelete] = useState(null)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [imageToPreview, setImageToPreview] = useState(null)
    const [imageIdToPreview, setImageIdToPreview] = useState(null)

    const handleEdit = (row) => {
        setEditForm({ id: row.id, name: row.name, image: row.image })
        setModalOpen(true)
    }
    const handleDelete = (row) => {
        setRowToDelete(row)
        setDeleteModalOpen(true)
    }

    const handleEditChange = e => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditSubmit = e => {
        e.preventDefault()
        alert('Edited category: ' + JSON.stringify(editForm))
        setModalOpen(false)
    }

    const handleDeleteConfirm = () => {
        alert('Deleted: ' + rowToDelete?.name)
        setDeleteModalOpen(false)
        setRowToDelete(null)
    }

    const handleImagePreview = (img, row) => {
        setImageToPreview(img)
        setImageIdToPreview(row.id)
        setImageModalOpen(true)
    }

    const columns = [
        { header: '#', accessor: 'id' },
        { header: 'დასახელება', accessor: 'name' },
        {
            header: 'სურათები',
            accessor: 'images',
            cell: row => (
                <button
                    className={product.imagePreviewBtn}
                    onClick={() => handleImagePreview(row.images, row)}
                >
                    ნახვა
                </button>
            )
        },
        { header: 'მოქმედება', accessor: 'actions' }
    ]

    const data = [
        { id: 1, name: 'მაგალითი კატეგორია', image: 'img.jpg', actions: 'რედაქტირება | წაშლა' }
    ]

    const editFields = [
        { label: 'დასახელება', type: 'text', name: 'name', value: editForm.name, onChange: handleEditChange },
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
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="წაშლის დადასტურება"
                message={rowToDelete ? `ნამდვილად გსურთ წაშალოთ კატეგორია: ${rowToDelete.name}?` : ''}
            />
            <ImagePreviewModal
                open={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                image={imageToPreview}
                imageId={imageIdToPreview}
                onImageUpdated={() => {
                    setImageModalOpen(false)
                }}
                onImageDeleted={() => {
                    setImageModalOpen(false)
                }}
            />
        </>
    )
}

export default CategoryTable