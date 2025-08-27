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


    </div>
  );
};

export default Home;
