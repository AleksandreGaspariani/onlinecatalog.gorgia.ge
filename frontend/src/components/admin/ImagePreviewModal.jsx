import React, { useState } from 'react'
import styles from '../../assets/css/Modal.module.css'
import defaultInstance from '../../api/defaultInstance'
import DeleteModal from './DeleteModal'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

const ImagePreviewModal = ({ open, onClose, image, onImageChange, imageId, onImageUpdated, onImageDeleted }) => {
    const [preview, setPreview] = useState(image)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    React.useEffect(() => {
        setPreview(image)
        setFile(null)
    }, [image, open])

    const handleDelete = async () => {
        if (!imageId) return
        setLoading(true)
        try {
            await defaultInstance.delete(`/images/${imageId}`)
            setPreview(null)
            setFile(null)
            if (onImageDeleted) onImageDeleted()
            setDeleteModalOpen(false)
        } catch (error) {
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
                <div className={styles.modalBody} style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '2rem' }}>
                    {image && Array.isArray(image) && image.length > 0 ? (
                        image.map((img, idx) => (
                            <img
                                key={idx}
                                src={`${API_BASE_URL}/${img}`}
                                alt={`img-${idx}`}
                                style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: 8, marginBottom: 16 }}
                            />
                        ))
                    ) : image ? (
                        <img
                            src={`${API_BASE_URL}/${image}`}
                            alt="img"
                            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: 8, marginBottom: 16 }}
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
