import React from 'react'
import logo from '../assets/images/logo.png'
import { IoIosPhonePortrait } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import '../assets/css/HeaderModal.css'

const HeaderModal = () => {
  const [showDropdown, setShowDropdown] = React.useState(false)

  const handleSearchClick = () => {
    setShowDropdown(true)
    console.log("search clicked")
  }

  return (
    <div className="header-modal">
      <div className="header-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="header-search">
        <input
          type="text"
          placeholder ="ძიება"
          className="search-input"
          onClick={handleSearchClick}
        />
        <button>
          <GoSearch style={{ color: "#017dbe", height: "1.2rem", width: "1.2rem" }}/>
        </button>

        {showDropdown && (
          <div className="search-dropdown">
            <ul>
              <li>პროდუქტი 1</li>
              <li>პროდუქტი 2</li>
              <li>პროდუქტი 3</li>
            </ul>
          </div>
        )}
      </div>
      <div className="header-phone">
        <IoIosPhonePortrait style={{ height: "1.7rem", width: "1.7rem" }}/>
        <span>032 2960 960</span>
      </div>
    </div>
  )
}

export default HeaderModal