import React from 'react'
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

const popularProducts = [
  { id: 1, name: "Product 1", image: BedroomPng },
  { id: 2, name: "Product 2", image: LivingRoomPng },
  { id: 3, name: "Product 3", image: BathroomPng },
  { id: 4, name: "Product 4", image: DecorationPng },
  { id: 5, name: "Product 5", image: OfficePng },
  { id: 6, name: "Product 6", image: BedroomPng },
  { id: 7, name: "Product 7", image: LivingRoomPng },
  { id: 8, name: "Product 8", image: BathroomPng }
];

const CarouselModal = () => {
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
        <button className="carousel-seeall-btn">ნახეთ ყველა &gt;</button>
      </div>
      <div className='carousel-container'>
        <Slider {...settings}>
          {popularProducts.map(product => (
            <div key={product.id} className='carousel-item'>
              <ItemCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default CarouselModal