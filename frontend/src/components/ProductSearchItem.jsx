import React from 'react';

const ProductSearchItem = ({ image, name, code, onClick }) => (
  <div
    className="product-search-item"
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      width: '100%'
    }}
  >
    <img
      src={image}
      alt={name}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        objectFit: 'cover',
        marginRight: '16px'
      }}
    />
    <div className="product-search-item-details" style={{ alignItems: 'flex-start' }}>
      <span className="product-search-item-name" style={{ fontSize: '1rem', color: '#828282', marginBottom: '4px',  }}>{name}</span>
      <span className="product-search-item-code" style={{ fontSize: '0.95rem', color: '#828282', fontWeight: 500 }}>{code}</span>
    </div>
  </div>
);


export default ProductSearchItem;
