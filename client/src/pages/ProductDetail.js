import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalf, FaRegStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setRelatedProducts(response.data.relatedProducts || []);
      setSelectedSize(response.data.sizes?.[0] || '');
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/products/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity, selectedSize);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

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

  if (loading) {
    return (
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '40px 0' }}>
        <div className="container text-center">
          <h2>Product not found</h2>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '30px', fontSize: '14px', color: '#6b7280' }}>
          <Link to="/" style={{ color: '#2563eb' }}>Home</Link>
          {' > '}
          <Link to="/products" style={{ color: '#2563eb' }}>Products</Link>
          {' > '}
          <Link to={`/products/${product.category}`} style={{ color: '#2563eb' }}>
            {product.categoryName}
          </Link>
          {' > '}
          <span>{product.title}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '60px' }}>
          {/* Product Images */}
          <div>
            <div style={{ 
              width: '100%', 
              height: '500px', 
              background: '#f3f4f6', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
              color: '#6b7280',
              marginBottom: '20px'
            }}>
              📷
            </div>
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid #2563eb' : '2px solid transparent'
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    📷
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
              {product.title}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', color: '#fbbf24' }}>
                  {renderStars(parseFloat(product.rating))}
                </div>
                <span style={{ color: '#6b7280' }}>({product.reviews} reviews)</span>
              </div>
              <span style={{ color: '#10b981', fontWeight: '500' }}>In Stock</span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb' }}>
                ${product.price}
              </span>
              {product.discount > 0 && (
                <>
                  <span style={{ 
                    textDecoration: 'line-through', 
                    color: '#6b7280', 
                    marginLeft: '12px',
                    fontSize: '20px'
                  }}>
                    ${product.originalPrice}
                  </span>
                  <span style={{ 
                    background: '#ef4444', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    marginLeft: '12px'
                  }}>
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '32px' }}>
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 1 && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>
                  Size: {selectedSize}
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '8px 16px',
                        border: selectedSize === size ? '2px solid #2563eb' : '2px solid #e5e7eb',
                        background: selectedSize === size ? '#dbeafe' : 'white',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid #e5e7eb',
                    background: 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  -
                </button>
                <span style={{ 
                  minWidth: '40px', 
                  textAlign: 'center', 
                  fontWeight: '600',
                  fontSize: '18px'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid #e5e7eb',
                    background: 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <FaShoppingCart />
                Add to Cart
              </button>
              <button
                className="btn btn-outline"
                style={{ padding: '12px' }}
              >
                <FaHeart />
              </button>
            </div>

            {/* Product Details */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Product Details</h3>
              <ul style={{ color: '#6b7280', lineHeight: '1.8' }}>
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Category:</strong> {product.categoryName}</li>
                <li><strong>Color:</strong> {product.color}</li>
                <li><strong>Stock:</strong> {product.stock} items available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
            Customer Reviews ({reviews.length})
          </h2>
          {reviews.length > 0 ? (
            <div style={{ display: 'grid', gap: '20px' }}>
              {reviews.map(review => (
                <div key={review.id} style={{ 
                  background: 'white', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <strong>{review.customerName}</strong>
                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                      {renderStars(review.rating)}
                    </div>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ color: '#6b7280' }}>{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6b7280' }}>No reviews yet. Be the first to review this product!</p>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
              Related Products
            </h2>
            <div className="product-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
