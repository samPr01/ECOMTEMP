import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SS Stores</h3>
            {/* Removed description as requested */}
            <div className="social-links" style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
              <a href="#" style={{ fontSize: '20px', color: '#d1d5db' }}><FaFacebook /></a>
              <a href="#" style={{ fontSize: '20px', color: '#d1d5db' }}><FaTwitter /></a>
              <a href="#" style={{ fontSize: '20px', color: '#d1d5db' }}><FaInstagram /></a>
              <a href="#" style={{ fontSize: '20px', color: '#d1d5db' }}><FaLinkedin /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products/menswear">Menswear</Link></li>
              <li><Link to="/products/womenwear">Womenwear</Link></li>
              <li><Link to="/products/electronics">Electronics</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              {/* Removed Contact Us as requested */}
              <li><Link to="/returns-exchanges">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/track-order">Track Your Order</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 SS Stores. All rights reserved. | Privacy Policy | Terms of Service | Accessibility</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
