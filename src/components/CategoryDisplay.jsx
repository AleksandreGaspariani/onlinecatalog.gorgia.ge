import React from 'react'

const CategoryDisplay = ({ imageSrc, name }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.18)',
          transition: 'box-shadow 0.2s',
        }}
      >
        <img
          src={imageSrc}
          // alt={name}
          style={{
            width: '110px',
            height: '110px',
            objectFit: 'cover',
            borderRadius: '50%',
            background: 'white'
          }}
        />
      </div>
      <p style={{ fontWeight: '500', color: 'black', fontSize: '18px', marginTop: '12px' }}>{name}</p>
    </div>
  )
}

export default CategoryDisplay