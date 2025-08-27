import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CategoryDisplay from '../../components/CategoryDisplay'
import '../../assets/css/Dashboard.css'
import CarouselModal from '../../components/CarouselModal'
import { setBreadcrumbs } from '../../redux/breadcrumbSlice'
import { setCategories } from '../../redux/categorySlice'
import { slugify } from '../../utils/slugify.js'
import defaultInstance from '../../api/defaultInstance'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [categories, setCategoriesState] = useState([])
  useEffect(() => {
    dispatch(setBreadcrumbs([{ label: 'Dashboard', path: '/' }]))
    defaultInstance.get('/categories')
      .then(res => {
        setCategoriesState(res.data)
        dispatch(setCategories(res.data))
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
      })
  }, [dispatch])

  return (
    <div className="dashboard">
      <div style={{ backgroundColor: '#E0E5EB' }}>
        <div className="categories">
          {categories.map((category) => (
            <div className="category-item" key={category.id}>
              <CategoryDisplay
                imageSrc={category.attachment || category.img}
                name={category.name}
                categoryId={category.id}
                slug={slugify(category.name)}
              />
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