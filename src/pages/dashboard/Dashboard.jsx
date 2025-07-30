import React from 'react'
import CategoryDisplay from '../../components/CategoryDisplay';

const categories = [
  { name: 'Bedroom', img: '' },
  { name: 'Living Room', img: '' },
  { name: 'Bathroom', img: '' },
  { name: 'Decoration', img: '' },
  { name: 'Office', img: '' }
];

const Dashboard = () => {
  
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-equally', }}>
        {categories.map((category, index) => (
          <CategoryDisplay key={index} imageSrc={category.img} categoryName={category.name} />
        ))}
      </div>
      <p>Welcome to your dashboard</p>
    </div>
  )
}

export default Dashboard