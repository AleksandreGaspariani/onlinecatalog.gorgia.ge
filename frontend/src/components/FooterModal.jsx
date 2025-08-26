import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import '../assets/css/FooterModal.css'

const FooterModal = () => {
  return (
    <footer className="footer-modal" style={{ width: '100% !important' }}>
      <div className="footer-content">
        <h2 className="footer-title">გამოიწერე სიახლეები</h2>
        <p className="footer-subtitle" style={{margin: '5px 0 30px 0'}}>
          გაიგე პირველმა ფასდაკლებების შესახებ.
        </p>

        <div className="footer-input">
          <form>
            <input type="email" placeholder="ელ. ფოსტა" />
            <button style={{outline: 'none'}}>
              <FaArrowRight />
            </button>
          </form>
        </div>
        <br />
        <p className="footer-note">
          © All rights reserved. 
        </p>
      </div>
    </footer>
  )
}

export default FooterModal