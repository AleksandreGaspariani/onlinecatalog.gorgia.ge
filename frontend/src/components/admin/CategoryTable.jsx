import React, { useState, useEffect } from 'react'
import product from '../../assets/css/ProductPage.module.css'
import Table from './Table'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
import ImagePreviewModal from './ImagePreviewModal'
import { IoIosAdd } from "react-icons/io";
import defaultInstance from '../../api/defaultInstance'


const CategoryTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [editForm, setEditForm] = useState({ id: '', name: '', image: '' })
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [rowToDelete, setRowToDelete] = useState(null)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [imageToPreview, setImageToPreview] = useState(null)
    const [imageIdToPreview, setImageIdToPreview] = useState(null)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [addForm, setAddForm] = useState({ name: '', image: '' })
    const [categories, setCategories] = useState([])

    useEffect(() => {
        defaultInstance.get('/categories')
            .then(res => {
                setCategories(res.data.map(cat => ({
                    id: cat.id,
                    name: cat.name,
                    attachment: cat.attachment,
                    actions: ''
                })))
            })
            .catch(error => {
                console.error('Error fetching categories:', error)
            })
    }, [])

    const handleEdit = (row) => {
        setEditForm({ id: row.id, name: row.name, image: row.image })
        setModalOpen(true)
    }
    const handleDelete = (row) => {
        setRowToDelete(row)
        setDeleteModalOpen(true)
    }

    const handleEditChange = e => {
        if (e.target.type === 'file') {
            setEditForm({ ...editForm, image: e.target.files[0] })
        } else {
            setEditForm({ ...editForm, [e.target.name]: e.target.value })
        }
    }

    const handleEditSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', editForm.name)
        if (editForm.image) {
            formData.append('image', editForm.image)
        }

        try {
            await defaultInstance.post(`/categories/${editForm.id}?_method=PUT`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
            setCategories(categories.map(cat =>
                cat.id === editForm.id ? { ...cat, name: editForm.name, attachment: editForm.image ? URL.createObjectURL(editForm.image) : cat.attachment } : cat
            ))
            setModalOpen(false)
        } catch (error) {
            console.error('Error updating category:', error)
        }
    }

    const handleDeleteConfirm = async () => {
        if (!rowToDelete) return;

        try {
            await defaultInstance.delete(`/categories/${rowToDelete.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            setCategories(categories.filter(cat => cat.id !== rowToDelete.id));
            setDeleteModalOpen(false);
            setRowToDelete(null);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    const handleImagePreview = (imgUrl, row) => {
        setImageToPreview(imgUrl)
        setImageIdToPreview(row.id)
        setImageModalOpen(true)
    }

    const handleAddChange = e => {
        if (e.target.type === 'file') {
            setAddForm({ ...addForm, image: e.target.files[0] })
        } else {
            setAddForm({ ...addForm, [e.target.name]: e.target.value })
        }
    }

    const handleAddSubmit = async e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', addForm.name);
        if (addForm.image) {
            formData.append('image', addForm.image);
        }

        try {
            await defaultInstance.post('/categories', formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            setAddModalOpen(false)
            setAddForm({ name: '', image: '' })
        } catch (error) {
            console.error('Error:', error)
            alert('Error: ' + (error.response?.data?.message || error.message))
        }
    }

    const addFields = [
        { label: 'დასახელება', type: 'text', name: 'name', value: addForm.name, onChange: handleAddChange },
        { label: 'სურათი', type: 'file', name: 'image', onChange: handleAddChange }
    ]

    const columns = [
        { header: '#', accessor: 'id' },
        { header: 'დასახელება', accessor: 'name' },
        {
            header: 'სურათები',
            accessor: 'attachment',
            cell: row => (
                row.attachment ? (
                    <button
                        className={product.imagePreviewBtn}
                        onClick={() => handleImagePreview(row.attachment, row)}
                    >
                        ნახვა
                    </button>
                ) : '---'
            )
        },
        { header: 'მოქმედება', accessor: 'actions' }
    ]

    const editFields = [
        { label: 'დასახელება', type: 'text', name: 'name', value: editForm.name, onChange: handleEditChange },
        { label: 'სურათი', type: 'file', name: 'image', onChange: handleEditChange }
    ]

    return (
        <>
            <button
                className={product.addProductBtn}
                onClick={() => setAddModalOpen(true)}
            >
                <IoIosAdd fontSize="20px" color='#fff' />
                კატეგორიის დამატება
            </button>
            <Table
                columns={columns}
                data={categories}
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
            <Edit
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                title="კატეგორიის დამატება"
                fields={addFields}
                onSubmit={handleAddSubmit}
                submitLabel="დამატება"
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