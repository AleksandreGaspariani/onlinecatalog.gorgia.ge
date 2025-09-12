import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import defaultInstance from '../../api/defaultInstance'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
import { toast } from "react-toastify";


const getOrderStatusLabel = (status) => {
    switch (status) {
        case 'pending':
            return 'მოლოდინში';
        case 'completed':
            return 'დასრულებულია';
        case 'cancelled':
            return 'გაუქმებულია';
        default:
            return status;
    }
}

const orderStatusOptions = [
    { value: 'pending', label: 'მოლოდინში' },
    { value: 'completed', label: 'დასრულებულია' },
    { value: 'cancelled', label: 'გაუქმებულია' }
]

const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'შეკვეთის სტატუსი', accessor: 'order_status', cell: row => getOrderStatusLabel(row.order_status) },
    { header: 'მიტანის თარიღი', accessor: 'delivery_date' },
    { header: 'ელ. ფოსტა', accessor: 'email' },
    { header: 'ტელეფონი', accessor: 'phone' },
    { header: 'ნივთის ID', accessor: 'item_id' },
    { header: 'რაოდენობა', accessor: 'quantity' },
    { header: 'ფასი', accessor: 'price' },
    { header: 'ჯამი', accessor: 'total' },
    { header: 'გადახდის ტიპი', accessor: 'payment_method' },
    { header: 'ქმედებები', accessor: 'actions' }
]

const OrderRequest = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [editRow, setEditRow] = useState(null)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteRow, setDeleteRow] = useState(null)
    const role = useSelector(state => state.user.role);
    const [editFields, setEditFields] = useState({
        email: '',
        phone: '',
        delivery_date: '',
        order_status: '',
        item_id: '',
        quantity: '',
        price: '',
        payment_method: ''
    })

    const handleEdit = (row) => {
        setEditRow(row)
        setEditFields({
            email: row.email || '',
            phone: row.phone || '',
            delivery_date: row.delivery_date || '',
            order_status: row.order_status || '',
            item_id: row.item_id || '',
            quantity: row.quantity || '',
            price: row.price || '',
            payment_method: row.payment_method || ''
        })
        setEditOpen(true)
    };

    const handleDelete = (row) => {
        setDeleteRow(row)
        setDeleteOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!deleteRow) return
        setLoading(true)
        try {
            await defaultInstance.delete(`/orders/${deleteRow.id}`)
            setData(prev => prev.filter(order => order.id !== deleteRow.id))
            toast.success("შეკვეთა წარმატებით წაიშალა")
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            toast.error("შეკვეთის წაშლა ვერ მოხერხდა")
        } finally {
            setLoading(false)
            setDeleteOpen(false)
            setDeleteRow(null)
        }
    }

    const handleEditFieldChange = (e) => {
        setEditFields(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        if (!editRow) return
        setLoading(true)
        try {
            await defaultInstance.put(`/orders/${editRow.id}`, {
                email: editFields.email,
                phone: editFields.phone,
                delivery_date: editFields.delivery_date,
                order_status: editFields.order_status,
                item_id: editFields.item_id,
                quantity: editFields.quantity,
                price: editFields.price,
                payment_method: editFields.payment_method
            })
            setData(prev =>
                prev.map(order =>
                    order.id === editRow.id
                        ? { ...order, ...editFields }
                        : order
                )
            )
            setEditOpen(false)
            setEditRow(null)
            toast.success("შეკვეთის ინფორმაცია წარმატებით განახლდა");
        } catch (err) {
            toast.error("შეკვეთის ინფორმაციის განახლება ვერ მოხერხდა");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        defaultInstance.get('/orders')
            .then(res => {
                const arr = Array.isArray(res.data.orders) ? res.data.orders : []
                setData(arr)
            })
            .catch(() => {
                setData([])
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onEdit={handleEdit}
                onDelete={role === 'admin' ? handleDelete : undefined}
            />
            <Edit
                open={editOpen}
                onClose={() => setEditOpen(false)}
                title="შეკვეთის რედაქტირება"
                fields={[
                    {
                        name: 'email',
                        label: 'ელ. ფოსტა',
                        type: 'text',
                        value: editFields.email,
                        onChange: handleEditFieldChange
                    },
                    {
                        name: 'phone',
                        label: 'ტელეფონი',
                        type: 'text',
                        value: editFields.phone,
                        onChange: handleEditFieldChange
                    },
                    {
                        name: 'delivery_date',
                        label: 'მიტანის თარიღი',
                        type: 'date',
                        value: editFields.delivery_date,
                        onChange: handleEditFieldChange
                    },
                    {
                        name: 'order_status',
                        label: 'შეკვეთის სტატუსი',
                        type: 'select',
                        value: editFields.order_status,
                        onChange: handleEditFieldChange,
                        options: orderStatusOptions
                    },
                    {
                        name: 'item_id',
                        label: 'ნივთის ID',
                        type: 'text',
                        value: editFields.item_id,
                        onChange: handleEditFieldChange
                    },
                    {
                        name: 'quantity',
                        label: 'რაოდენობა',
                        type: 'number',
                        value: editFields.quantity,
                        onChange: handleEditFieldChange
                    },
                    {
                        name: 'price',
                        label: 'ფასი',
                        type: 'number',
                        value: editFields.price,
                        onChange: handleEditFieldChange
                    },
                    {
                        name: 'payment_method',
                        label: 'გადახდის ტიპი',
                        type: 'text',
                        value: editFields.payment_method,
                        onChange: handleEditFieldChange
                    }
                ]}
                onSubmit={handleEditSubmit}
                submitLabel="შენახვა"
                splitColumns={true}
            />
            <DeleteModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="შეკვეთის წაშლა"
                message="ნამდვილად გსურთ ამ შეკვეთის წაშლა?"
            />
        </>
    )
}

export default OrderRequest