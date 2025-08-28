import React, { useRef, useEffect, useState } from 'react';
import CarouselModal from '../../components/CarouselModal';
import '../../assets/css/Product.css';
import { useDispatch, useSelector } from 'react-redux'
import { setBreadcrumbs } from '../../redux/breadcrumbSlice'
import { useParams } from 'react-router-dom'
import { slugify } from '../../utils/slugify.js';
import defaultInstance from '../../api/defaultInstance.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';


const Product = () => {
  const dispatch = useDispatch();
  const { categoryName, productId } = useParams();
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const [descMaxWidth, setDescMaxWidth] = useState('100%');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [imagesSectionHeight, setImagesSectionHeight] = useState('auto');
  const [productNameState, setProductName] = useState('');
  const [productData, setProductData] = useState(null);
  const categories = useSelector(state => state.category.categories);


  const categorySlug = categoryName;
  const matchedCategory = categories.find(cat => slugify(cat.name) === categorySlug);
  const productSlug = slugify(productNameState);

  const matchedProduct = matchedCategory && matchedCategory.products
    ? matchedCategory.products.find(product => slugify(product.numerologicalName) === productSlug)
    : null;


  const [showFullDesc, setShowFullDesc] = useState(false);

  const getTruncatedText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  useEffect(() => {
    if (productId) {
      defaultInstance.get(`/products/${productId}`)
        .then(res => {
          setProductData(res.data);
        })
        .catch(error => {
          console.log(error);
          setProductData(null);
        });
    }
  }, [productId]);

  useEffect(() => {
    if (titleRef.current && productData) {
      setProductName(productData.numerologicalName);
      setDescMaxWidth(titleRef.current.offsetWidth + 'px');
    }
    if (infoRef.current) {
      setImagesSectionHeight(infoRef.current.offsetHeight + 'px');
    }
  }, [productData]);

  useEffect(() => {
    if (productId) {
      dispatch(setBreadcrumbs([
        { label: 'Dashboard', path: '/' },
        matchedCategory
          ? { label: matchedCategory.name, path: `/category/${categorySlug}` }
          : { label: categoryName, path: `/category/${categorySlug}` },
        { label: productData ? productData.numerologicalName : '', path: `/category/${categorySlug}/product/${productId}` }
      ]));
    }
  }, [dispatch, productId, categoryName, categorySlug, matchedCategory, productData]);

  return (
    <div className="product-root">
      <div className="product-row">
        <div
          className="product-images-section"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: imagesSectionHeight,
            minHeight: imagesSectionHeight
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginRight: '20px',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            {productData && productData.image && Array.isArray(productData.image) && productData.image.map((img, idx) => (
              <img
                key={idx}
                src={`${API_BASE_URL}/${img}`}
                alt={`Thumbnail ${idx + 1}`}
                className="product-thumbnail-img"
                style={{
                  border: idx === selectedImgIdx ? '1px solid #017dbe' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedImgIdx(idx)}
              />
            ))}
            {productData && productData.image && !Array.isArray(productData.image) && (
              <img
                src={`${API_BASE_URL}/${productData.image}`}
                alt="Thumbnail"
                className="product-thumbnail-img"
                style={{ marginLeft: 0, padding: '5px' }}

                onClick={() => setSelectedImgIdx(0)}
              />
            )}
          </div>
          {productData && productData.image && Array.isArray(productData.image) ? (
            <img
              src={`${API_BASE_URL}/${productData.image[selectedImgIdx]}`}
              alt="Main chair"
              className="product-main-img"
              style={{ marginLeft: 0, padding: '10px' }}
            />
          ) : productData && productData.image ? (
            <img
              src={`${API_BASE_URL}/${productData.image}`}
              alt="Main chair"
              className="product-main-img"
              style={{ marginLeft: 0, padding: '10px' }}
            />
          ) : null}
        </div>

        <div className="product-info-section" ref={infoRef}>
          <h2 className="product-title" ref={titleRef}>
            {productData ? productData.numerologicalName : ''}
          </h2>
          <div className="product-description">
            <br />
            <p>კოდი: <span style={{ fontWeight: 'bold' }}>{productData ? productData.bmCode : ''}</span></p>
            <div>
              <p>ანოტაცია:</p>
              <br />
              <div
                style={{
                  maxWidth: descMaxWidth,
                  wordBreak: 'break-word',
                  whiteSpace: 'normal'
                }}
              >
                <span
                  style={{
                    color: '#828282',
                    fontSize: '0.95rem',
                  }}
                >
                  {showFullDesc
                    ? (productData ? productData.annotation : '')
                    : getTruncatedText(productData ? productData.annotation : '', 22)}
                </span>
                <span
                  style={{
                    color: '#017dbe',
                    fontWeight: '500',
                    marginLeft: '4px',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}
                  onClick={() => setShowFullDesc((prev) => !prev)}
                >
                  {showFullDesc ? 'Read Less' : 'Read More'}
                </span>
              </div>
            </div>
            <div>
              <p>რაოდენობა შეფუთვაში: {productData ? productData.packageCount : ''} </p>
              <p>მწარმოებელი ქვეყანა: {productData ? productData.manufacturer : ''} </p>
            </div>
            <button style={{ backgroundColor: '#017dbe', borderRadius: '10px', padding: '10px 20px', cursor: 'pointer', outline: 'none' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>შეკვეთა</span>
            </button>
          </div>
        </div>
      </div>

      <div className="product-details">
        <h3 className="product-details-title">მახასიათებლები: </h3>
        <div className="product-details-content">
          {/* First column */}
          <div className="product-details-col">
            <p>დასახელება: {productData ? productData.numerologicalName : ''} </p>
            <p>არტიქული: {productData ? productData.article : '.......................'} </p>
            <p>შტრიხკოდი: {productData ? productData.barcode : '.......................'}</p>
          </div>
          {/* Second column */}
          <div className="product-details-col">
            <p>სიგრძე: {productData && productData.length ? productData.length + ' მ' : '0.5 მ'}</p>
            <p>სიგანე: {productData && productData.width ? productData.width + ' მ' : '0.57 მ'}</p>
            <p>სიმაღლე: {productData && productData.height ? productData.height + ' მ' : '0.87 მ'}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '10vh', width: '100%', marginBottom: '10vh' }}>
        <CarouselModal />
      </div>
    </div>
  );
};

export default Product
