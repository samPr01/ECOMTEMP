import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    
    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        📷
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <div className="stars">
            {renderStars(parseFloat(product.rating))}
          </div>
          <span className="rating-text">({product.reviews})</span>
        </div>
        <div className="product-price">
          ₹{product.price}
          {product.discount > 0 && (
            <>
              <span className="product-original-price">₹{product.originalPrice}</span>
              <span className="product-discount">{product.discount}% OFF</span>
            </>
          )}
        </div>
        {product.featured && (
          <div style={{ 
            background: '#10b981', 
            color: 'white', 
            padding: '4px 8px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            fontWeight: '600',
            marginTop: '8px',
            display: 'inline-block'
          }}>
            Featured
          </div>
        )}
        {product.newArrival && (
          <div style={{ 
            background: '#f59e0b', 
            color: 'white', 
            padding: '4px 8px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            fontWeight: '600',
            marginTop: '8px',
            marginLeft: '8px',
            display: 'inline-block'
          }}>
            New
          </div>
        )}
        {product.bestseller && (
          <div style={{ 
            background: '#8b5cf6', 
            color: 'white', 
            padding: '4px 8px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            fontWeight: '600',
            marginTop: '8px',
            marginLeft: '8px',
            display: 'inline-block'
          }}>
            Bestseller
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
