import React from 'react'
import { Link } from 'react-router-dom';
import CategoryDisplay from '../../components/CategoryDisplay';
import '../../assets/css/Dashboard.css'
import BedroomPng from '../../assets/images/bedroom.png'
import LivingRoomPng from '../../assets/images/livingRoom.png'
import BathroomPng from '../../assets/images/bathroom.png'
import DecorationPng from '../../assets/images/decorations.png'
import OfficePng from '../../assets/images/office.png'
import CarouselModal from '../../components/CarouselModal';

const categories = [
  { name: 'Bedroom', img: BedroomPng },
  { name: 'Living Room', img: LivingRoomPng },
  { name: 'Bathroom', img: BathroomPng },
  { name: 'Decorations', img: DecorationPng },
  { name: 'Office', img: OfficePng },
  { name: 'Bedroom', img: BedroomPng },
  { name: 'Living Room', img: LivingRoomPng },
  { name: 'Bathroom', img: BathroomPng },
  { name: 'Decorations', img: DecorationPng },
  { name: 'Office', img: OfficePng }
];

const Dashboard = () => {
  
  return (
    <div className="dashboard">
      <div style={{ backgroundColor: '#E0E5EB' }}>
        <div className="categories">
          {categories.map((category, index) => (
            <div className="category-item" key={index}>
              <CategoryDisplay imageSrc={category.img} name={category.name} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '10vh', width: '100%', marginBottom: '10vh' }}>
        <CarouselModal />
      </div>
      <Link to="/category/1">Category 1</Link>
    </div>
  )
}

export default Dashboard