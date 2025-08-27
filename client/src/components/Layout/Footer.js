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
            <p>Your trusted partner for quality products across fashion, electronics, home decor, and lifestyle essentials. We're committed to providing exceptional value and customer service.</p>
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
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Track Your Order</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaPhone style={{ color: '#2563eb' }} />
                <span>1-800-SS-STORE</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaEnvelope style={{ color: '#2563eb' }} />
                <span>support@ssstores.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaMapMarkerAlt style={{ color: '#2563eb' }} />
                <span>123 Commerce St, Shopping District, NY 10001</span>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <p><strong>Store Hours:</strong></p>
              <p>Mon-Fri: 9AM-9PM</p>
              <p>Sat-Sun: 10AM-8PM</p>
            </div>
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
