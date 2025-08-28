import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '../assets/css/CarouselModal.css'
import BedroomPng from '../assets/images/bedroom.png'
import LivingRoomPng from '../assets/images/livingRoom.png'
import BathroomPng from '../assets/images/bathroom.png'
import DecorationPng from '../assets/images/decorations.png'
import OfficePng from '../assets/images/office.png'
import ItemCard from './ItemCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { slugify } from '../utils/slugify.js';
import defaultInstance from '../api/defaultInstance.js'

const CarouselModal = () => {
  const navigate = useNavigate();
  const categories = useSelector(state => state.category.categories);
  const popularCategory = categories.find(cat => cat.name === 'პოპულარული პროდუქტები');
  const allCategory = categories.find(cat => cat.name === 'ყველა');

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    defaultInstance.get('/products')
      .then(res => setPopularProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <div style={{ maxWidth: '80%', margin: "40px auto 0 auto", padding: "0 16px" }}>
      <div className="carousel-header-row">
        <h2 className="carousel-title">პოპულარული პროდუქტები</h2>
        <button
          className="carousel-seeall-btn"
          onClick={() => {
            navigate(`/category/${slugify(allCategory.name)}`);
            window.scrollTo(0, 0);
          }}
        >
          ნახეთ ყველა &gt;
        </button>
      </div>
      <div className='carousel-container'>
        <Slider {...settings}>
          {popularProducts.map(product => (
            <div key={product.id} className='carousel-item'>
              <ItemCard product={product} category={popularCategory} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default CarouselModal