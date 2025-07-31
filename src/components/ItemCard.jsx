import React from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import '../assets/css/ItemCard.css';

const ItemCard = ({ product }) => {
  return (
    <div className="carousel-card">
      <img src={product.image} alt={product.name} className="carousel-img" />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '8px'}}>
        <p className="carousel-name">{product.name}</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <button className="carousel-seemore-btn">ნახეთ მეტი</button>
          <button className="carousel-fav-btn" style={{ marginLeft: 'auto', color: '#017dbe', transform: 'translateY(20%)' }}><IoMdHeartEmpty /></button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;