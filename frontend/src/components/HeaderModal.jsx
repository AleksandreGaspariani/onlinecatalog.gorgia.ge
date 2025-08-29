import React from 'react'
import { GoSearch } from "react-icons/go";
import '../assets/css/HeaderModal.css'
import ProductSearchItem from './ProductSearchItem';
import BedroomPng from '../assets/images/bedroom.png'
import LivingRoomPng from '../assets/images/livingRoom.png'
import BathroomPng from '../assets/images/bathroom.png'
import DecorationPng from '../assets/images/decorations.png'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import defaultInstance from "../api/defaultInstance"

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
  const [profileDropdown, setProfileDropdown] = React.useState(false);
  const profileRef = React.useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await defaultInstance.post('/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('authToken');
      }
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  }

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

  // Close profile dropdown when clicking outside
  React.useEffect(() => {
    if (!profileDropdown) return;
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdown]);

  return (
    <div className="header-modal">
      {/* Centered search container */}
      <div className="header-modal-left" />
      <div className="header-modal-center">
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
      </div>
      <div className="profile-section" ref={profileRef}>
        <button
          className="profile-icon-btn"
          onClick={() => setProfileDropdown((v) => !v)}
        >
          <FaUserCircle style={{ color: "#017dbe", width: "2.2rem", height: "2.2rem" }} />
        </button>
        {profileDropdown && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-item profile-dropdown-profile">
              <FaUserCircle style={{ marginRight: 8, color: "#017dbe" }} />
              <span>Profile</span>
            </div>
            <div className="profile-dropdown-divider" />
            <div className="profile-dropdown-item profile-dropdown-logout" onClick={handleLogout}>
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}

export default HeaderModal