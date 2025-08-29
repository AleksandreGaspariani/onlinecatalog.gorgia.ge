import React from 'react';
import '../assets/css/ItemCard.css';
import { useNavigate } from 'react-router-dom'
import { slugify } from '../utils/slugify.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

const ItemCard = ({ product, category }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    console.log('ItemCard handleClick:', {
      category,
      productId: product.id,
      slug: category && category.name ? slugify(category.name) : null
    });
    if (!category || !category.name || !product.id) return;
    navigate(`/category/${slugify(category.name)}/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="carousel-card">

      <img
        src={
          product.image
            ? Array.isArray(product.image)
              ? `${API_BASE_URL}/${product.image[0]}`
              : `${API_BASE_URL}/${product.image}`
            : '/default-image.png'
        }
        alt={product.name}
        className="carousel-img"
      />

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '8px' }}>
        <p className="carousel-name">{product.name}</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <button className="carousel-seemore-btn" onClick={handleClick}>ნახეთ მეტი</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;