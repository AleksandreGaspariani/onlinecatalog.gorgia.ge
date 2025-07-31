import React, { useState } from 'react'
import Table from './Table'
import Modal from './Modal'
import '../../assets/css/AdminPage.module.css'
import product from '../../assets/css/ProductPage.module.css'



const columns = [
    { header: '#', accessor: 'id' },
    { header: 'სახელი', accessor: 'name' },
    { header: 'კონტრაქტორის IBAN', accessor: 'iban' },
    { header: 'კონტრაქტორის საიდენტიფიკაციო ნომერი', accessor: 'contragentIbanNumber' },
    { header: 'კონტრაქტორის ტელეფონის ნომერი', accessor: 'phone' },
    { header: 'კონტრაქტორის სახელი', accessor: 'contragentName' },
    { header: 'კონტრაქტორის ელფოსტა', accessor: 'contragentEmail' },
    { header: 'Email', accessor: 'email' },
    { header: 'Password', accessor: 'password' },
    { header: 'Actions', accessor: 'actions' },

]

const data = [
    {
        id: 1,
        name: 'მაგალითი კატეგორია',
        iban: 'GE29NB0000000101904917',
        contragentIbanNumber: '123456789',
        phone: '+995599123456',
        contragentName: 'კონტრაგენტი',
        contragentEmail: 'contragent@example.com',
        email: 'user@example.com',
        password: '********',
        actions: 'რედაქტირება | წაშლა'
    }
]

const Users = () => {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    const fields = [
        {
            label: 'Name',
            type: 'text',
            name: 'name',
            value: form.name,
            onChange: handleChange,
            autoFocus: true
        },
        {
            label: 'Email Address',
            type: 'email',
            name: 'email',
            value: form.email,
            onChange: handleChange
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            value: form.password,
            onChange: handleChange
        }
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <button
                className={product.addProductBtn}
                onClick={() => setOpen(true)}
            >
                + Create New User
            </button>
            <Table columns={columns} data={data} />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Add User"
                fields={fields}
                onSubmit={handleSubmit}
                submitLabel="Create Account"
            />
        </div>
    )
}

export default Users