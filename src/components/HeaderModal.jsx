import React from 'react'
import { GoSearch } from "react-icons/go";
import '../assets/css/HeaderModal.css'

const HeaderModal = () => {
  const [showDropdown, setShowDropdown] = React.useState(false)
  const searchRef = React.useRef(null)

  const handleSearchClick = () => {
    setShowDropdown(true)
    console.log("search clicked")
  }

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