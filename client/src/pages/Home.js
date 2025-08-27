import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTshirt, 
  FaVenus, 
  FaShoePrints, 
  FaHome, 
  FaLaptop, 
  FaGem, 
  FaDumbbell 
} from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        params: {
          featured: true,
          limit: 8
        }
      });
      setFeaturedProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons = {
    menswear: FaTshirt,
    womenwear: FaVenus,
    footwear: FaShoePrints,
    home: FaHome,
    electronics: FaLaptop,
    lifestyle: FaGem,
    fitness: FaDumbbell
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
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to SS Stores</h1>
          <p>Discover quality products for every aspect of your lifestyle</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 className="text-center mb-4" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '40px' }}>
            Shop by Category
          </h2>
          <div className="category-grid">
            {categories.map(category => {
              const IconComponent = categoryIcons[category.key];
              return (
                <Link 
                  key={category.key} 
                  to={`/products/${category.key}`} 
                  className="category-card"
                >
                  <div className="category-icon">
                    <IconComponent />
                  </div>
                  <div className="category-name">
                    {category.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
        <div className="container">
          <h2 className="text-center mb-4" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '40px' }}>
            Featured Products
          </h2>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="grid grid-3">
            <div className="text-center">
              <div style={{ fontSize: '48px', color: '#2563eb', marginBottom: '16px' }}>🚚</div>
              <h3 style={{ marginBottom: '12px' }}>Free Shipping</h3>
              <p>Free shipping on orders over $50. Fast and reliable delivery nationwide.</p>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '48px', color: '#2563eb', marginBottom: '16px' }}>↩️</div>
              <h3 style={{ marginBottom: '12px' }}>Easy Returns</h3>
              <p>30-day return policy. No questions asked if you're not completely satisfied.</p>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '48px', color: '#2563eb', marginBottom: '16px' }}>🛡️</div>
              <h3 style={{ marginBottom: '12px' }}>Secure Shopping</h3>
              <p>Your payment information is secure with our encrypted checkout process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#1f2937', color: 'white' }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: '16px' }}>Stay Updated</h2>
          <p style={{ marginBottom: '32px', fontSize: '18px' }}>
            Subscribe to our newsletter for exclusive deals and new arrivals
          </p>
          <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', gap: '12px' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="form-input"
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
