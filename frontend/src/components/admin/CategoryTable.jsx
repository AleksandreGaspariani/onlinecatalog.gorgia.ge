import React, { useState, useEffect } from 'react'
import axios from 'axios'
import product from '../../assets/css/ProductPage.module.css'
import Table from './Table'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
import ImagePreviewModal from './ImagePreviewModal'
import { IoIosAdd } from "react-icons/io";
import defaultInstance from '../../api/defaultInstance'
import { toast } from "react-toastify";

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
    const [suggestions, setSuggestions] = useState([])
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [groupMap, setGroupMap] = useState({});

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

    const fetchSuggestions = async () => {
        try {
            const response = await axios.post('https://back.gorgia.ge/api/online_catalog/group/names', {
                token: '$2y$12$dyqm74uwPn/FE674dAwba.fWgwMLcPI5ip4dSTNcH2neDl1Jk0Fni'
            });

            if (response.data && response.data.groups) {
                const groupsData = response.data.groups;
                const suggestionsList = Object.values(groupsData);
                setSuggestions(suggestionsList);
                setGroupMap(groupsData);
            } else {
                setSuggestions([]);
                setGroupMap({});
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
            setGroupMap({});
        }
    };

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
            setModalOpen(false)
            toast.error('Error updating category: ' + (error.response?.data?.message || error.message))
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
            toast.success('კატეგორია წარმატებით წაიშალა!');
        } catch (error) {
            setDeleteModalOpen(false);
            toast.error('თქვენ არ გაქვთ უფლება წაშალოთ ეს კატეგორია!');
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
            if (e.target.name === 'name') {
                const inputValue = e.target.value.trim().toLowerCase()
                if (inputValue.length === 0) {
                    setFilteredSuggestions([])
                } else {
                    // Use includes for substring matching, case-insensitive
                    const matches = suggestions.filter(sugg =>
                        sugg.toLowerCase().includes(inputValue)
                    )
                    setFilteredSuggestions(matches)
                }
            }
        }
    }

    const handleSuggestionClick = (suggestion) => {
        setAddForm({ ...addForm, name: suggestion })
        setFilteredSuggestions([])
    }

    const handleAddSubmit = async e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', addForm.name);
        if (addForm.image) {
            formData.append('image', addForm.image);
        }

        let group_id = null;
        for (const [id, name] of Object.entries(groupMap)) {
            if (name === addForm.name) {
                group_id = id;
                break;
            }
        }
        if (group_id) {
            formData.append('group_id', group_id);
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
            toast.success('კატეგორია წარმატებით დაემატა!')
        } catch (error) {
            setAddModalOpen(false)
            toast.error('Error: ' + (error.response?.data?.message || error.message))
        }
    }

    const handleAddModalOpen = () => {
        fetchSuggestions();
        setAddModalOpen(true);
    }

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
                onClick={handleAddModalOpen}
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
                onSubmit={handleAddSubmit}
                submitLabel="დამატება"
            >
                <div style={{ margin: '20px 0 15px 0', position: 'relative', textAlign: 'left', }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: 6,
                            color: '#444',
                            fontSize: '16px',
                        }}
                    >
                        დასახელება
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={addForm.name}
                        onChange={handleAddChange}
                        autoComplete="off"
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '10px 18px',
                            backgroundColor: '#fff',
                            color: '#292929ff',
                            outline: 'none',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px'
                        }}
                    />
                    {addModalOpen && filteredSuggestions.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            background: '#fff',
                            textAlign: 'left',
                            color: 'black',
                            border: '1px solid #ccc',
                            zIndex: 1000,
                            width: '100%',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            borderRadius: '0 0 8px 8px'
                        }}>
                            {filteredSuggestions.map((sugg, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer'
                                    }}
                                    onMouseDown={() => handleSuggestionClick(sugg)}
                                >
                                    {sugg}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: 6,
                            color: '#444',
                            fontSize: '16px'
                        }}
                    >
                        სურათი
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleAddChange}
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '10px 18px',
                            backgroundColor: '#fff',
                            color: '#292929ff',
                            outline: 'none',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px'
                        }}
                    />
                </div>
            </Edit>
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

