import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import '../assets/css/FooterModal.css'

const FooterModal = ({ visible }) => {
  if (!visible) return null;
  return (
    <footer className="footer-modal">
      <div className="footer-content">
        <h2 className="footer-title">გამოიწერე სიახლეები</h2>
        <p className="footer-subtitle">
          გაიგე პირველმა ფასდაკლებების შესახებ.
        </p>

        <div className="footer-input">
          <input type="text" placeholder="ელ. ფოსტა" />
          <button>
            <FaArrowRight />
          </button>
        </div>

        <p className="footer-note">
          © All rights reserved. Made by GORGIA
        </p>
      </div>
    </footer>
  )
}

export default FooterModal