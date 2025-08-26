import React, { useState, useEffect } from 'react'
import Table from './Table'
import Modal from './Modal'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
import '../../assets/css/AdminPage.module.css'
import product from '../../assets/css/ProductPage.module.css'
import defaultInstance from '../../api/defaultInstance'
import { useSelector } from 'react-redux'

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
    const userRole = useSelector(state => state.user?.role);

    useEffect(() => {
        defaultInstance.get('/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Accept': 'application/json'
            }
        })
            .then(res => res.data)
            .then(users => {
                setData(users.map((user, idx) => ({
                    id: user.id,
                    name: user.name,
                    address: user.profile?.contact_address || '',
                    contragentIBAN: user.profile?.contact_iban || '',
                    contragentTIN: user.profile?.contact_tin || '',
                    phone: user.profile?.contact_phone || '',
                    contragentName: user.profile?.contact_name || '',
                    contragentEmail: user.profile?.contact_email || '',
                    email: user.email,
                    password: '********',
                    role: user.role,
                    actions: '',
                })));
            });
    }, [])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        defaultInstance.post('/users', form, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Accept': 'application/json'
            }
        })
            .then(res => {
                setOpen(false);
                setForm({ name: '', email: '', password: '', role: '' });
                // Optionally refresh users
                defaultInstance.get('/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Accept': 'application/json'
                    }
                })
                    .then(res => res.data)
                    .then(users => {
                        setData(users.map((user, idx) => ({
                            id: user.id,
                            name: user.name,
                            address: user.profile?.contact_address || '',
                            contragentIBAN: user.profile?.contact_iban || '',
                            contragentTIN: user.profile?.contact_tin || '',
                            phone: user.profile?.contact_phone || '',
                            contragentName: user.profile?.contact_name || '',
                            contragentEmail: user.profile?.contact_email || '',
                            email: user.email,
                            password: '********',
                            role: user.role,
                            actions: '',
                        })));
                    });
            })
            .catch(err => {
                alert('Error: ' + (err.response?.data?.message || err.message));
            });
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

    const getRoleOptions = () => {
        if (userRole === 'admin') {
            return [
                { label: 'ოპერატორი', value: 'operator' },
                { label: 'პრისეილერი', value: 'presailer' }
            ];
        }
        if (userRole === 'presailer') {
            return [
                { label: 'კონტრაგენტი', value: 'contragent' }
            ];
        }
        return [];
    };

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
        },
        {
            label: 'Role',
            type: 'select',
            name: 'role',
            value: form.role || '',
            onChange: handleChange,
            options: getRoleOptions()
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
        { header: 'როლი', accessor: 'role' },
        ...(userRole === 'admin' || userRole === 'presailer'
            ? [{ header: 'მოქმედებები', accessor: 'actions' }]
            : [])
    ];

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