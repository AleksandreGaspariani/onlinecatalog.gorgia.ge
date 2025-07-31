import React, { useState } from 'react'
import product from '../../assets/css/ProductPage.module.css'
import Modal from './Modal'
import Table from './Table'
import Edit from './Edit'

const ProductTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [productCode, setProductCode] = useState('')
    const [editModalOpen, setEditModalOpen] = useState(false)
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
        if (window.confirm(`Delete product: ${row.numerologicalName}?`)) {
            alert('Deleted!')
        }
    }

    const handleEditChange = e => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditSubmit = e => {
        e.preventDefault()
        alert('Edited product: ' + JSON.stringify(editForm))
        setEditModalOpen(false)
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
        { header: 'სურათები', accessor: 'images' },
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
                onClick={() => setModalOpen(true)}
            >
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
        </>
    )
}

export default ProductTable