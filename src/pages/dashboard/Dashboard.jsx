import React from 'react'
import CategoryDisplay from '../../components/CategoryDisplay';
import '../../assets/css/Dashboard.css'
import BedroomPng from '../../assets/images/bedroom.png'
import LivingRoomPng from '../../assets/images/livingRoom.png'
import BathroomPng from '../../assets/images/bathroom.png'
import DecorationPng from '../../assets/images/decorations.png'
import OfficePng from '../../assets/images/office.png'

const categories = [
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
            <CategoryDisplay key={index} imageSrc={category.img} name={category.name} />
          ))}
        </div>
      </div>
      <p>Welcome to your dashboard</p>
    </div>
  )
}

export default Dashboard