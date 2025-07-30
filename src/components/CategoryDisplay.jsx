import React from 'react'

const CategoryDisplay = ({ imageSrc, name}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img 
      src={imageSrc} 
      alt={name} 
      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
      />
      <p style={{ fontWeight: 'bold' }}>{name}</p>
    </div>
  )
}

export default CategoryDisplay