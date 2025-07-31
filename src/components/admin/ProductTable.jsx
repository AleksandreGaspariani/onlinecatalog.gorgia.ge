import React, { useState } from 'react'
import product from '../../assets/css/ProductPage.module.css'
import Modal from './Modal'
import Table from './Table'

const ProductTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [productCode, setProductCode] = useState('')

    const handleProductSubmit = e => {
        e.preventDefault()
        // ...submit logic...
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

            <Table columns={columns} data={data} />
        </>
    )
}

export default ProductTable