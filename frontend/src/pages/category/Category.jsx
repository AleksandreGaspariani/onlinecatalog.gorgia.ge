import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '../../assets/css/Category.css'
import ItemCard from '../../components/ItemCard.jsx';
import Pagination from '../../components/Pagination.jsx';
import { setBreadcrumbs } from '../../redux/breadcrumbSlice'
import { setCategoryInfo } from '../../redux/categorySlice'
import { slugify } from '../../utils/slugify.js'
import defaultInstance from '../../api/defaultInstance.js';

const ITEMS_PER_PAGE = 8;

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categories)

  const categorySlug = slugify(categoryName);
  const matchedCategory = categories.find(cat => slugify(cat.name) === categorySlug);
  const categoryId = matchedCategory ? matchedCategory.id : null

  useEffect(() => {
    if (categoryId) {
      defaultInstance.get('/products')
        .then(res => {
          const filteredProducts = res.data.filter(product => product.category_id === categoryId);
          setProducts(filteredProducts);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }

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
        კატალოგი <span style={{ color: '#000' }}>/ {matchedCategory ? matchedCategory.name : categoryName}</span>
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