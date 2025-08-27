import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaStore, FaUser, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../auth/LogoutButton';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { count } = useCart();
  const { isAuthenticated, user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const categories = [
    { key: 'menswear', name: 'Menswear' },
    { key: 'womenwear', name: 'Womenwear' },
    { key: 'footwear', name: 'Footwear' },
    { key: 'home', name: 'Home' },
    { key: 'electronics', name: 'Electronics' },
    { key: 'lifestyle', name: 'Lifestyle' },
    { key: 'fitness', name: 'Fitness' }
  ];

  return (
    <header className="header">
      
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <FaStore />
              SS Stores
            </Link>
            
            <form onSubmit={handleSearch} className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </form>
            
            <div className="header-actions">
              <Link to="/cart" className="cart-button">
                <FaShoppingCart />
                {count > 0 && <span className="cart-count">{count}</span>}
              </Link>
              
              {/* Single profile dropdown for both authenticated and non-authenticated users */}
              <div className="user-menu">
                <button 
                  className="user-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <FaUser />
                  {isAuthenticated && <span className="user-name">{user?.firstName}</span>}
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    {isAuthenticated ? (
                      <>
                        <Link 
                          to="/profile" 
                          className="dropdown-item"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FaUser /> Profile
                        </Link>
                        {user?.role === 'admin' && (
                          <Link 
                            to="/admin" 
                            className="dropdown-item"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FaStore /> Admin Panel
                          </Link>
                        )}
                        <LogoutButton 
                          className="dropdown-item logout-item"
                          showConfirmation={false}
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FaSignOutAlt /> Logout
                        </LogoutButton>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          className="dropdown-item"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FaUser /> Login
                        </Link>
                        <Link 
                          to="/register" 
                          className="dropdown-item"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FaUserPlus /> Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="nav">
        <div className="container">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            {categories.map(category => (
              <li key={category.key}>
                <Link 
                  to={`/products/${category.key}`} 
                  className="nav-link"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
