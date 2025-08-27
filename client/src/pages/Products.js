import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Products = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    minPrice: '',
    maxPrice: '',
    brand: '',
    sort: 'newest'
  });

  useEffect(() => {
    fetchProducts();
  }, [category, currentPage, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        sort: filters.sort
      });

      if (category) params.append('category', category);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.brand) params.append('brand', filters.brand);

      const response = await axios.get(`/api/products?${params}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryNames = {
    menswear: 'Menswear',
    womenwear: 'Womenwear',
    footwear: 'Footwear',
    home: 'Home',
    electronics: 'Electronics',
    lifestyle: 'Lifestyle',
    fitness: 'Fitness'
  };

  const brands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Apple', 'Samsung', 'IKEA', 'Uniqlo'];

  return (
    <div style={{ padding: '40px 0', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <div className="container" style={{ maxWidth: '100%', padding: '0 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
            {category ? categoryNames[category] : 'All Products'}
          </h1>
          {filters.search && (
            <p style={{ color: '#6b7280', fontSize: '18px' }}>
              Search results for "{filters.search}"
            </p>
          )}
        </div>

        <div className="products-layout">
          {/* Filters Sidebar */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Filters</h3>
            
            {/* Search */}
            <div className="form-group">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-input"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Price Range */}
            <div className="form-group">
              <label className="form-label">Price Range</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Brand */}
            <div className="form-group">
              <label className="form-label">Brand</label>
              <select
                className="form-select"
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="form-group">
              <label className="form-label">Sort By</label>
              <select
                className="form-select"
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <button 
              className="btn btn-secondary w-full"
              onClick={() => {
                setFilters({
                  search: '',
                  minPrice: '',
                  maxPrice: '',
                  brand: '',
                  sort: 'newest'
                });
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </button>
          </div>

          {/* Products Grid */}
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            {loading ? (
              <div className="spinner"></div>
            ) : products.length > 0 ? (
              <>
                <div className="product-grid">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '8px', 
                    marginTop: '40px',
                    flexWrap: 'wrap',
                    maxWidth: '100%'
                  }}>
                    {currentPage > 1 && (
                      <button
                        className="btn btn-outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        style={{ minWidth: 'auto', padding: '8px 12px' }}
                      >
                        Previous
                      </button>
                    )}
                    
                    {/* Show limited page numbers to prevent horizontal overflow */}
                    {(() => {
                      const maxVisiblePages = 5;
                      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                      
                      if (endPage - startPage + 1 < maxVisiblePages) {
                        startPage = Math.max(1, endPage - maxVisiblePages + 1);
                      }
                      
                      const pages = [];
                      
                      if (startPage > 1) {
                        pages.push(
                          <button
                            key={1}
                            className="btn btn-outline"
                            onClick={() => handlePageChange(1)}
                            style={{ minWidth: '40px', padding: '8px 12px' }}
                          >
                            1
                          </button>
                        );
                        if (startPage > 2) {
                          pages.push(<span key="ellipsis1" style={{ padding: '8px 4px' }}>...</span>);
                        }
                      }
                      
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <button
                            key={i}
                            className={`btn ${i === currentPage ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => handlePageChange(i)}
                            style={{ minWidth: '40px', padding: '8px 12px' }}
                          >
                            {i}
                          </button>
                        );
                      }
                      
                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push(<span key="ellipsis2" style={{ padding: '8px 4px' }}>...</span>);
                        }
                        pages.push(
                          <button
                            key={totalPages}
                            className="btn btn-outline"
                            onClick={() => handlePageChange(totalPages)}
                            style={{ minWidth: '40px', padding: '8px 12px' }}
                          >
                            {totalPages}
                          </button>
                        );
                      }
                      
                      return pages;
                    })()}
                    
                    {currentPage < totalPages && (
                      <button
                        className="btn btn-outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        style={{ minWidth: 'auto', padding: '8px 12px' }}
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center" style={{ padding: '60px 20px' }}>
                <h3 style={{ marginBottom: '16px' }}>No products found</h3>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Try adjusting your filters or search terms
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setFilters({
                      search: '',
                      minPrice: '',
                      maxPrice: '',
                      brand: '',
                      sort: 'newest'
                    });
                    setCurrentPage(1);
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
