import React, { useRef, useState } from 'react'
import styles from '../../assets/css/Modal.module.css'
import product from '../../assets/css/ProductPage.module.css'
import defaultInstance from '../../api/defaultInstance'
import DeleteModal from './DeleteModal'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

const ImagePreviewModal = ({ open, onClose, image, onImageChange, imageId, onImageUpdated, onImageDeleted }) => {
    const [preview, setPreview] = useState(image)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const fileInputRef = useRef(null)

    React.useEffect(() => {
        setPreview(image)
        setFile(null)
    }, [image, open])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
            setFile(file)
            if (onImageChange) onImageChange(file)
        }
    }

    const handleUpdate = async () => {
        if (!file || !imageId) return
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', file)
            await defaultInstance.post(`/images/${imageId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            if (onImageUpdated) onImageUpdated(file)
            setFile(null)
        } catch (err) {
            alert('სურათის განახლება ვერ მოხერხდა')
        }
        setLoading(false)
    }

    const handleDelete = async () => {
        if (!imageId) return
        setLoading(true)
        try {
            await defaultInstance.delete(`/images/${imageId}`)
            setPreview(null)
            setFile(null)
            if (onImageDeleted) onImageDeleted()
            setDeleteModalOpen(false)
        } catch (err) {
            alert('სურათის წაშლა ვერ მოხერხდა')
        }
        setLoading(false)
    }

    if (!open) return null

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}></h2>
                    <button
                        className={styles.modalCloseBtn}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <div className={styles.modalBody} style={{ textAlign: 'center', marginTop: '2rem' }}>
                    {preview ? (
                        <img
                            src={`${API_BASE_URL}/${image}`}
                            alt="სურათის დამატება"
                            style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8, marginBottom: 16 }}
                        />
                    ) : (
                        <div style={{ marginBottom: 16 }}>სურათი ვერ მოიძებნა</div>
                    )}
                </div>
            </div>
            {deleteModalOpen && (
                <DeleteModal
                    open={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default ImagePreviewModal
