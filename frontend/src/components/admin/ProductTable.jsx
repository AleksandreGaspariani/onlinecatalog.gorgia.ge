import React, { useState } from 'react'
import product from '../../assets/css/ProductPage.module.css'
import Modal from './Modal'
import Table from './Table'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
import ImagePreviewModal from './ImagePreviewModal'
import { IoIosAdd } from "react-icons/io";

const ProductTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [productCode, setProductCode] = useState('')
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [rowToDelete, setRowToDelete] = useState(null)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [imageToPreview, setImageToPreview] = useState(null)
    const [imageIdToPreview, setImageIdToPreview] = useState(null)
    const [editForm, setEditForm] = useState({
        numerologicalName: '',
        price: '',
        bmCode: '',
        article: '',
        barcode: '',
        size: '',
        packageCount: '',
        manufacturer: '',
        annotation: '',
        images: ''
    })

    const handleProductSubmit = e => {
        e.preventDefault()
        console.log({ productCode })
    }

    const handleEdit = (row) => {
        setEditForm({
            numerologicalName: row.numerologicalName || '',
            price: row.price || '',
            bmCode: row.bmCode || '',
            article: row.article || '',
            barcode: row.barcode || '',
            size: row.size || '',
            packageCount: row.packageCount || '',
            manufacturer: row.manufacturer || '',
            annotation: row.annotation || '',
            images: row.images || ''
        })
        setEditModalOpen(true)
    }
    const handleDelete = (row) => {
        setRowToDelete(row)
        setDeleteModalOpen(true)
    }

    const handleDeleteConfirm = () => {
        alert('Deleted: ' + rowToDelete?.numerologicalName)
        setDeleteModalOpen(false)
        setRowToDelete(null)
    }

    const handleEditChange = e => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditSubmit = e => {
        e.preventDefault()
        alert('Edited product: ' + JSON.stringify(editForm))
        setEditModalOpen(false)
    }

    const handleImagePreview = (img, row) => {
        setImageToPreview(img)
        setImageIdToPreview(row.id)
        setImageModalOpen(true)
    }

    const columns = [
        { header: '#', accessor: 'id' },
        { header: 'კატეგორია', accessor: 'category' },
        { header: 'ნუმეროლოგიური სახელი', accessor: 'numerologicalName' },
        { header: 'ღირებულება', accessor: 'price' },
        { header: 'BM კოდი', accessor: 'bmCode' },
        { header: 'არტიკული', accessor: 'article' },
        { header: 'შტრიხკოდი', accessor: 'barcode' },
        { header: 'ზომა', accessor: 'size' },
        { header: 'პაკეტის რაოდენობა', accessor: 'packageCount' },
        { header: 'მწარმოებელი', accessor: 'manufacturer' },
        { header: 'ანოტაცია', accessor: 'annotation' },
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
        { header: 'ქმედებები', accessor: 'actions' }
    ]

    const data = [
        {
            id: 1,
            category: 'მაგალითი',
            numerologicalName: 'სახელი',
            price: '100₾',
            bmCode: 'BM-000000',
            article: '12345',
            barcode: '20099999891215asdasdasdasdsad',
            size: '1x1',
            packageCount: 10,
            manufacturer: 'მწარმოებელი',
            annotation: 'ანოტაცია',
            images: 'img.jpg',
            actions: 'რედაქტირება | წაშლა'
        }
    ]

    const productFields = [
        {
            label: 'პროდუქტის კოდი',
            type: 'text',
            name: 'productCode',
            value: productCode,
            onChange: e => setProductCode(e.target.value),
            autoFocus: true
        }
    ]

    const editFields = [
        { label: 'ნუმეროლოგიური სახელი', type: 'text', name: 'numerologicalName', value: editForm.numerologicalName, onChange: handleEditChange },
        { label: 'ღირებულება', type: 'text', name: 'price', value: editForm.price, onChange: handleEditChange },
        { label: 'BM კოდი', type: 'text', name: 'bmCode', value: editForm.bmCode, onChange: handleEditChange },
        { label: 'არტიკული', type: 'text', name: 'article', value: editForm.article, onChange: handleEditChange },
        { label: 'შტრიხკოდი', type: 'text', name: 'barcode', value: editForm.barcode, onChange: handleEditChange },
        { label: 'ზომა', type: 'text', name: 'size', value: editForm.size, onChange: handleEditChange },
        { label: 'პაკეტის რაოდენობა', type: 'text', name: 'packageCount', value: editForm.packageCount, onChange: handleEditChange },
        { label: 'მწარმოებელი', type: 'text', name: 'manufacturer', value: editForm.manufacturer, onChange: handleEditChange },
        { label: 'ანოტაცია', type: 'text', name: 'annotation', value: editForm.annotation, onChange: handleEditChange },
    ]

    return (
        <>
            <button
                className={product.addProductBtn}
            >
                <IoIosAdd fontSize="20px" color='#fff' />
                პროდუქტის დამატება
            </button>
            <button
                className={product.addProductBtn}
                onClick={() => setModalOpen(true)}
            >
                <IoIosAdd fontSize="20px" color='#fff' />
                პროდუქტის დამატება 1c დან
            </button>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="პროდუქტის დამატება"
                fields={productFields}
                onSubmit={handleProductSubmit}
                submitLabel="დამატება"
            />

            <Table
                columns={columns}
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <Edit
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="პროდუქტის რედაქტირება"
                fields={editFields}
                onSubmit={handleEditSubmit}
                submitLabel="შენახვა"
                splitColumns={true}
            />
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="წაშლის დადასტურება"
                message={rowToDelete ? `ნამდვილად გსურთ წაშალოთ პროდუქტი: ${rowToDelete.numerologicalName}?` : ''}
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

export default ProductTable