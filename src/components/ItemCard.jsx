import React from 'react';
import '../assets/css/ItemCard.css';
import { useNavigate } from 'react-router-dom'
import { slugify } from '../utils/slugify.js';


const ItemCard = ({ product, category }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${slugify(category.name)}/product/${slugify(product.name)}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="carousel-card">
      <img src={product.image} alt={product.name} className="carousel-img" />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '8px'}}>
        <p className="carousel-name">{product.name}</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <button className="carousel-seemore-btn" onClick={handleClick}>ნახეთ მეტი</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;