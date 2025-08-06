import React, { useRef, useEffect, useState } from 'react';
import CarouselModal from '../../components/CarouselModal';
import chairImg from '../../assets/images/office.png';
import '../../assets/css/Product.css';
import LivingRoomPng from '../../assets/images/livingRoom.png'
import BathroomPng from '../../assets/images/bathroom.png'
import DecorationPng from '../../assets/images/decorations.png'
import { useDispatch, useSelector } from 'react-redux'
import { setBreadcrumbs } from '../../redux/breadcrumbSlice'
import { useParams } from 'react-router-dom'
import { slugify } from '../../utils/slugify.js';

// Add more images for demonstration
const productImages = [
  chairImg,
  LivingRoomPng,
  BathroomPng,
  DecorationPng
];

const Product = () => {
  const dispatch = useDispatch();
  const { categoryName, productName } = useParams();
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const [descMaxWidth, setDescMaxWidth] = useState('100%');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [imagesSectionHeight, setImagesSectionHeight] = useState('auto');
  const [productNameState, setProductName] = useState('');
  const categories = useSelector(state => state.category.categories);


  const categorySlug = categoryName;
  const matchedCategory = categories.find(cat => slugify(cat.name) === categorySlug);
  const productSlug = slugify(productNameState);

  // Prevent error if matchedCategory is undefined or does not have products
  const matchedProduct = matchedCategory && matchedCategory.products
    ? matchedCategory.products.find(product => slugify(product.name) === productSlug)
    : null;

  const annotationText = `The simple and elegant shape makes it very suitable for those for you who like those of you who wants a minimalist room. This chair is designed to blend seamlessly with modern interiors, offering both comfort and style for your living space. Its sturdy construction ensures durability while maintaining a lightweight profile for easy movement.`;

  const [showFullDesc, setShowFullDesc] = useState(false);

  const getTruncatedText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Set productName from the UI after mount
  useEffect(() => {
    if (titleRef.current) {
      setProductName(titleRef.current.textContent);
      setDescMaxWidth(titleRef.current.offsetWidth + 'px');
    }
    if (infoRef.current) {
      setImagesSectionHeight(infoRef.current.offsetHeight + 'px');
    }
  }, []);

  // Update breadcrumbs when productName is set
  useEffect(() => {
    if (productName) {
      dispatch(setBreadcrumbs([
        { label: 'Dashboard', path: '/' },
        matchedCategory
          ? { label: matchedCategory.name, path: `/category/${categorySlug}` }
          : { label: categoryName, path: `/category/${categorySlug}` },
        { label: matchedProduct ? matchedProduct.name : productNameState, path: `/category/${categorySlug}/product/${productSlug}` }
      ]));
    }
  }, [dispatch, productName, categoryName, categorySlug, matchedCategory, matchedProduct, productSlug, productNameState]);
  
  return (
    <div className="product-root">
      {/* Row: Images (left) and Info (right) */}
      <div className="product-row">
        {/* Images Section */}
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
              marginRight: '24px',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            {productImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="product-thumbnail-img"
                style={{
                  border: idx === selectedImgIdx ? '1px solid #017dbe' : '1px solid #ccc',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedImgIdx(idx)}
              />
            ))}
          </div>
          <img
            src={productImages[selectedImgIdx]}
            alt="Main chair"
            className="product-main-img"
            style={{ marginLeft: 0 }}
          />
        </div>

        {/* Product Info Section */}
        <div className="product-info-section" ref={infoRef}>
          <h2 className="product-title" ref={titleRef}>მისაღები ოთახის სკამი</h2>
          <div className="product-description">
            <br />
            <p>კოდი: <span style={{ fontWeight: 'bold' }}>BM-00182057</span></p>
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
                  {showFullDesc ? annotationText : getTruncatedText(annotationText, 22)}
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
              <p>რაოდენობა შეფუთვაში: 6 </p>
              <p>მწარმოებელი ქვეყანა: თურქეთი </p>
            </div>
            <button style={{  backgroundColor: '#017dbe', borderRadius: '10px', padding: '10px 20px', cursor: 'pointer', outline: 'none' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>შეკვეთა</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section Below */}
      <div className="product-details">
        <h3 className="product-details-title">მახასიათებლები: </h3>
        <div className="product-details-content">
          {/* First column */}
          <div className="product-details-col">
            <p>დასახელება: მისალის ოთახის სკამი </p>
            <p>არტიქული: ....................... </p>
            <p>შტრიხკოდი: .......................</p>
          </div>
          {/* Second column */}
          <div className="product-details-col">
            <p>სიგრძე: 0.5 მ</p>
            <p>სიგანე: 0.57 მ</p>
            <p>სიმაღლე: 0.87 მ</p>
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
