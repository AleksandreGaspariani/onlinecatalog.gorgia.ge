import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '../../assets/css/Category.css'
import BedroomPng from '../../assets/images/bedroom.png'
import LivingRoomPng from '../../assets/images/livingRoom.png'
import BathroomPng from '../../assets/images/bathroom.png'
import DecorationPng from '../../assets/images/decorations.png'
import OfficePng from '../../assets/images/office.png'
import ItemCard from '../../components/ItemCard.jsx';
import Pagination from '../../components/Pagination.jsx';
import { setBreadcrumbs } from '../../redux/breadcrumbSlice'
import { setCategoryInfo } from '../../redux/categorySlice'
import { slugify } from '../../utils/slugify.js'

const products = [
  { id: 1, name: "საწოლი", image: BedroomPng },
  { id: 2, name: "მისაღები სავარძელი", image: LivingRoomPng },
  { id: 3, name: "Product 3", image: BathroomPng },
  { id: 4, name: "Product 4", image: DecorationPng },
  { id: 5, name: "Product 5", image: OfficePng },
  { id: 6, name: "Product 6", image: BedroomPng },
  { id: 7, name: "Product 7", image: LivingRoomPng },
  { id: 8, name: "Product 8", image: BathroomPng },
  { id: 9, name: "Product 9", image: DecorationPng },
  { id: 10, name: "Product 10", image: OfficePng },
  { id: 11, name: "Product 11", image: BedroomPng },
  { id: 12, name: "Product 12", image: LivingRoomPng },
  { id: 13, name: "Product 13", image: BathroomPng },
  { id: 14, name: "Product 14", image: DecorationPng },
  { id: 15, name: "Product 15", image: OfficePng }
];

const ITEMS_PER_PAGE = 8;


const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryName } = useParams();
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categories)

  const categorySlug = slugify(categoryName);
  const matchedCategory = categories.find(cat => slugify(cat.name) === categorySlug);
  const categoryId = matchedCategory ? matchedCategory.id : null

  useEffect(() => {
    dispatch(setBreadcrumbs([
      { label: 'Dashboard', path: '/' },
      { label: matchedCategory ? matchedCategory.name : categoryName, path: `/category/${categorySlug}` }
    ]))
    dispatch(setCategoryInfo({ name: matchedCategory ? matchedCategory.name : categoryName, id: categoryId }))
  }, [dispatch, categorySlug, categoryName, categoryId, matchedCategory])

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIdx, endIdx);

  console.log(categoryName, categorySlug);

  return (
    <div style={{ maxWidth: '70%', margin: "40px auto 0 auto", padding: "0 16px" }}>
      <h2 className='category-title'>
        კატალოგი <span style={{color: '#000'}}>/ {matchedCategory ? matchedCategory.name : categoryName}</span>
      </h2> 
      <div className="categoryItems-list">
        {paginatedProducts.map(product => (
          <div key={product.id} className='category-item'>
            <ItemCard product={product} category={{ name: matchedCategory ? matchedCategory.name : categoryName }} />
          </div>
        ))}
      </div>
      <Pagination
        totalItems={products.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default Category