import React from 'react'
import Table from './Table'

const columns = [
    { header: '#', accessor: 'id' },
    { header: 'დასახელება', accessor: 'name' },
    { header: 'სურათი', accessor: 'image' },
    { header: 'მოქმედება', accessor: 'actions' }
]

const data = [
    { id: 1, name: 'მაგალითი კატეგორია', image: 'img.jpg', actions: 'რედაქტირება | წაშლა' }
]

const CategoryTable = () => (
    <>
        <Table columns={columns} data={data} />
    </>
)

export default CategoryTable