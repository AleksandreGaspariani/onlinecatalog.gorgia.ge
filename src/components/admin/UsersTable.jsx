import React, { useState, useEffect } from 'react'
import Table from './Table'
import Modal from './Modal'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
import '../../assets/css/AdminPage.module.css'
import product from '../../assets/css/ProductPage.module.css'



const columns = [
    { header: '#', accessor: 'id' },
    { header: 'სახელი', accessor: 'name' },
    { header: 'კონტრაქტორის მისამართი', accessor: 'address' },
    { header: 'კონტრაქტორის IBAN', accessor: 'contragentIBAN' },
    { header: 'კონტრაქტორის TIN', accessor: 'contragentTIN' },
    { header: 'კონტრაქტორის ტელეფონის ნომერი', accessor: 'phone' },
    { header: 'კონტრაქტორის სახელი', accessor: 'contragentName' },
    { header: 'კონტრაქტორის ელფოსტა', accessor: 'contragentEmail' },
    { header: 'ელფოსტა', accessor: 'email' },
    { header: 'პაროლი', accessor: 'password' },
    { header: 'მოქმედებები', accessor: 'actions' },

]

const Users = () => {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [data, setData] = useState([])
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [rowToDelete, setRowToDelete] = useState(null)

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(setData)
    }, [])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(form)
    }

    const handleEdit = (user) => {
        setEditForm({
            name: user.name || '',
            email: user.email || '',
            password: user.password || ''
        })
        setEditModalOpen(true)
    }
    const handleDelete = (user) => {
        setRowToDelete(user)
        setDeleteModalOpen(true)
    }

    const handleDeleteConfirm = () => {
        alert('Deleted: ' + rowToDelete?.name)
        setDeleteModalOpen(false)
        setRowToDelete(null)
    }

    const handleEditChange = e => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditSubmit = e => {
        e.preventDefault()
        alert('Edited user: ' + JSON.stringify(editForm))
        setEditModalOpen(false)
    }

    const fields = [
        {
            label: 'Name',
            type: 'text',
            name: 'name',
            value: form.name,
            onChange: handleChange,
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

    const editFields = [
        {
            label: 'Name',
            type: 'text',
            name: 'name',
            value: editForm.name,
            onChange: handleEditChange,
        },
        {
            label: 'Email Address',
            type: 'email',
            name: 'email',
            value: editForm.email,
            onChange: handleEditChange
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            value: editForm.password,
            onChange: handleEditChange
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
            <Table
                columns={columns}
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Add User"
                fields={fields}
                onSubmit={handleSubmit}
                submitLabel="Create Account"
            />
            <Edit
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit User"
                fields={editFields}
                onSubmit={handleEditSubmit}
                submitLabel="Save"
            />
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="წაშლის დადასტურება"
                message={rowToDelete ? `ნამდვილად გსურთ წაშალოთ მომხმარებელი: ${rowToDelete.name}?` : ''}
            />
        </div>
    )
}

export default Users