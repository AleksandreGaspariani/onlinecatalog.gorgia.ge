import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import CategoryDisplay from '../../components/CategoryDisplay';
import '../../assets/css/Dashboard.css'
import BedroomPng from '../../assets/images/bedroom.png'
import LivingRoomPng from '../../assets/images/livingRoom.png'
import BathroomPng from '../../assets/images/bathroom.png'
import DecorationPng from '../../assets/images/decorations.png'
import OfficePng from '../../assets/images/office.png'
import CarouselModal from '../../components/CarouselModal';
import { setBreadcrumbs } from '../../redux/breadcrumbSlice'
import { setCategories } from '../../redux/categorySlice'
import { slugify } from '../../utils/slugify.js'

const categories = [
  { name: 'საძინებელი', img: BedroomPng, id: 2 },
  { name: 'მისაღები ოთახი', img: LivingRoomPng, id: 3 },
  { name: 'Bathroom', img: BathroomPng, id: 4 },
  { name: 'Decorations', img: DecorationPng, id: 5 },
  { name: 'Office', img: OfficePng, id: 6 },
  { name: 'Bedroom', img: BedroomPng, id: 7 },
  { name: 'Living Room', img: LivingRoomPng, id: 8 },
  { name: 'Bathroom', img: BathroomPng, id: 9 },
  { name: 'Decorations', img: DecorationPng, id: 10 },
  { name: 'Office', img: OfficePng, id: 11 }
];

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBreadcrumbs([{ label: 'Dashboard', path: '/' }]))
    // Add popular category to redux for lookup, but not for display
    dispatch(setCategories([
      { name: 'პოპულარული პროდუქტები', img: BedroomPng, id: 0 },
      { name: 'ყველა', img: BedroomPng, id: 1 },
      ...categories
    ]))
  }, [dispatch])

  return (
    <div className="dashboard">
      <div style={{ backgroundColor: '#E0E5EB' }}>
        <div className="categories">
          {categories.map((category, index) => (
            <div className="category-item" key={index}>
              <CategoryDisplay imageSrc={category.img} name={category.name} categoryId={category.id} slug={slugify(category.name)} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '10vh', width: '100%', marginBottom: '10vh' }}>
        <CarouselModal />
      </div>
    </div>
  )
}

export default Dashboard