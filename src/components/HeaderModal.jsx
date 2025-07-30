import React from 'react'
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
    </div>
  )
}

export default HeaderModal