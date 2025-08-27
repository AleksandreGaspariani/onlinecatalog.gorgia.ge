import React from 'react'
import { GoSearch } from "react-icons/go";
import '../assets/css/HeaderModal.css'
import ProductSearchItem from './ProductSearchItem';
import BedroomPng from '../assets/images/bedroom.png'
import LivingRoomPng from '../assets/images/livingRoom.png'
import BathroomPng from '../assets/images/bathroom.png'
import DecorationPng from '../assets/images/decorations.png'

const searchProducts = [
  { id: 1, name: "მისაღები ოთახის სკამი", code: "BM - 773377", image: BedroomPng },
  { id: 2, name: "მისაღები ოთახის სკამი", code: "BM - 773377", image: LivingRoomPng },
  { id: 3, name: "მისაღები ოთახის სკამი", code: "BM - 773377", image: DecorationPng },
  { id: 4, name: "მისაღები ოთახის სკამი", code: "BM - 773377", image: BathroomPng },
  { id: 5, name: "მისაღები ოთახის სკამი", code: "BM - 773377", image: BedroomPng }
];

const HeaderModal = () => {
  const [showDropdown, setShowDropdown] = React.useState(false)
  const searchRef = React.useRef(null)
  const [dropdownWidth, setDropdownWidth] = React.useState(420)

  const handleSearchClick = () => {
    setShowDropdown(true)
  }

  React.useEffect(() => {
    if (searchRef.current) {
      setDropdownWidth(searchRef.current.offsetWidth)
    }
  }, [showDropdown])

  React.useEffect(() => {
    if (!showDropdown) return

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  return (
    <div className="header-modal">
      <div className="header-search" ref={searchRef}>
        <input
          type="text"
          placeholder="ძიება"
          className="search-input"
          onClick={handleSearchClick}
        />
        <button className="search-input-btn">
          <GoSearch style={{ color: "#017dbe", height: "1.2rem", width: "1.2rem" }} />
        </button>
        {showDropdown && (
          <div
            className="search-dropdown"
            style={{
              width: dropdownWidth,
              minWidth: dropdownWidth,
              left: 0,
              top: '100%',
            }}
          >
            <div className="search-dropdown-list">
              {searchProducts.slice(0, 4).map(product => (
                <div key={product.id} className="product-search-item-container">
                  <ProductSearchItem
                    image={product.image}
                    name={product.name}
                    code={product.code}
                    onClick={() => {/* handle product click */ }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {/* add */}
      </div>
    </div>
  )
}

export default HeaderModal