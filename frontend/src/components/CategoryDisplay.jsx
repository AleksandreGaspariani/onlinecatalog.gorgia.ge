import React from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

// eslint-disable-next-line no-unused-vars
const CategoryDisplay = ({ imageSrc, name, categoryId, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${slug}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={handleClick}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.18)',
          transition: 'box-shadow 0.2s',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <img
          src={`${API_BASE_URL}/${imageSrc}`}
          style={{
            width: '160px',
            height: '160px',
            objectFit: 'cover',
            borderRadius: '50%',
            background: 'white'
          }}
        />
      </button>
      <p style={{ fontWeight: '500', color: 'black', fontSize: '18px', marginTop: '12px' }}>{name}</p>
    </div>
  )
}

export default CategoryDisplay