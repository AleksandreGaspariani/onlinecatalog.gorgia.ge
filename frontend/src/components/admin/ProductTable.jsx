import React, { useEffect, useState } from 'react'
import product from '../../assets/css/ProductPage.module.css'
import Modal from './Modal'
import Table from './Table'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
import ImagePreviewModal from './ImagePreviewModal'
import { IoIosAdd } from "react-icons/io";
import defaultInstance from '../../api/defaultInstance'

const ProductTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modal1cOpen, setModal1cOpen] = useState(false)
    const [productCode, setProductCode] = useState('')
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [rowToDelete, setRowToDelete] = useState(null)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [imageToPreview, setImageToPreview] = useState(null)
    const [imageIdToPreview, setImageIdToPreview] = useState(null)
    const [products, setProducts] = useState([]) // initialize as empty array

    useEffect(() => {
        defaultInstance.get('/products')
            .then(res => {
                setProducts(res.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error)
            })
    }, [])

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

    const [productForm, setProductForm] = useState({
        productCode: '',
        numerologicalName: '',
        price: '',
        bmCode: '',
        article: '',
        barcode: '',
        size: '',
        packageCount: '',
        manufacturer: '',
        annotation: '',
        image: ''
    })

    const handleProductSubmit = async e => {
        e.preventDefault()

        const formData = new FormData()
        Object.entries(productForm).forEach(([key, value]) => {
            if (key === 'image' && value) {
                formData.append('image', value)
            } else if (key !== 'image') {
                formData.append(key, value)
            }
        })


        try {
            const response = await defaultInstance.post('/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            console.log('Product added:', data)
        } catch (error) {
            console.error('Error adding product:', error)
        }

        setModalOpen(false)
        setProductForm({
            productCode: '',
            numerologicalName: '',
            price: '',
            bmCode: '',
            article: '',
            barcode: '',
            size: '',
            packageCount: '',
            manufacturer: '',
            annotation: '',
            image: null
        })
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
            accessor: 'image',
            cell: row => (
                <button
                    className={product.imagePreviewBtn}
                    onClick={() => handleImagePreview(row.image, row)}
                >
                    ნახვა
                </button>
            )
        },
        { header: 'ქმედებები', accessor: 'actions' }
    ]

    const productFields = columns
        .filter(col => col.accessor !== 'actions' && col.accessor !== 'id' && col.accessor !== 'images')
        .map(col => ({
            label: col.header,
            type: col.accessor === 'images' ? 'file' : 'text',
            name: col.accessor,
            value: productForm[col.accessor],
            onChange: e => setProductForm({
                ...productForm,
                [col.accessor]: e.target.value
            })
        }));


    productFields.push({
        label: 'სურათები',
        type: 'file',
        name: 'image',
        value: undefined,
        onChange: e => setProductForm({ ...productForm, image: e.target.files[0] })
    })

    const product1cFields = [
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
                onClick={() => setModalOpen(true)}
            >
                <IoIosAdd fontSize="20px" color='#fff' />
                პროდუქტის დამატება
            </button>
            <button
                className={product.addProductBtn}
                onClick={() => setModal1cOpen(true)}
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
            <Modal
                open={modal1cOpen}
                onClose={() => setModal1cOpen(false)}
                title="პროდუქტის დამატება 1c დან"
                fields={product1cFields}
                onSubmit={handleProductSubmit}
                submitLabel="დამატება"
            />
            <Table
                columns={columns}
                data={Array.isArray(products) ? products : []}
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