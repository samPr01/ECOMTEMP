require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');
const path = require('path');

// Import database connection
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Load products data
const products = require('./data/products');

// In-memory storage (in production, use a proper database)
let orders = [];
let cartSessions = new Map();
let reviews = [];

// Mount routes
app.use('/api/auth', authRoutes);

// Routes

// Get all products with filtering and pagination
app.get('/api/products', (req, res) => {
  try {
    let filteredProducts = [...products];
    
    // Category filter
    if (req.query.category) {
      filteredProducts = filteredProducts.filter(p => p.category === req.query.category);
    }
    
    // Search filter
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      const minPrice = parseFloat(req.query.minPrice) || 0;
      const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }
    
    // Brand filter
    if (req.query.brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === req.query.brand);
    }
    
    // Sort
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({
      products: paginatedProducts,
      totalProducts: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      currentPage: page,
      hasNextPage: endIndex < filteredProducts.length,
      hasPrevPage: page > 1
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Get related products (same category, different products)
    const relatedProducts = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    
    res.json({
      ...product,
      relatedProducts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = [...new Set(products.map(p => ({
      key: p.category,
      name: p.categoryName
    })))];
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get featured products
app.get('/api/products/featured', (req, res) => {
  try {
    const featuredProducts = products.filter(p => p.featured).slice(0, 8);
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

// Cart management
app.post('/api/cart/add', (req, res) => {
  try {
    const { sessionId, productId, quantity = 1, size } = req.body;
    
    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'Session ID and Product ID are required' });
    }
    
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (!cartSessions.has(sessionId)) {
      cartSessions.set(sessionId, []);
    }
    
    const cart = cartSessions.get(sessionId);
    const existingItem = cart.find(item => item.productId === parseInt(productId) && item.size === size);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: uuidv4(),
        productId: parseInt(productId),
        quantity,
        size,
        addedAt: new Date()
      });
    }
    
    res.json({ message: 'Product added to cart', cartCount: cart.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});

// Get cart
app.get('/api/cart/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const cart = cartSessions.get(sessionId) || [];
    
    const cartWithProducts = cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product
      };
    });
    
    const total = cartWithProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    res.json({
      items: cartWithProducts,
      total: total.toFixed(2),
      count: cart.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Update cart item
app.put('/api/cart/update', (req, res) => {
  try {
    const { sessionId, itemId, quantity } = req.body;
    
    if (!cartSessions.has(sessionId)) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const cart = cartSessions.get(sessionId);
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Remove from cart
app.delete('/api/cart/remove', (req, res) => {
  try {
    const { sessionId, itemId } = req.body;
    
    if (!cartSessions.has(sessionId)) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const cart = cartSessions.get(sessionId);
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    cart.splice(itemIndex, 1);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// Place order
app.post('/api/orders', (req, res) => {
  try {
    const { sessionId, customerInfo, paymentInfo } = req.body;
    
    if (!cartSessions.has(sessionId)) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    const cart = cartSessions.get(sessionId);
    if (cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    const orderItems = cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product,
        price: product.price
      };
    });
    
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = {
      id: uuidv4(),
      orderNumber: `SS${Date.now()}`,
      items: orderItems,
      customerInfo,
      paymentInfo: {
        method: paymentInfo.method,
        last4: paymentInfo.cardNumber ? paymentInfo.cardNumber.slice(-4) : null
      },
      total: total.toFixed(2),
      status: 'confirmed',
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    };
    
    orders.push(order);
    cartSessions.delete(sessionId); // Clear cart after order
    
    res.json({
      message: 'Order placed successfully',
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        estimatedDelivery: order.estimatedDelivery
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Get order by ID
app.get('/api/orders/:orderId', (req, res) => {
  try {
    const order = orders.find(o => o.id === req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Admin routes
app.get('/api/admin/products', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/admin/orders', (req, res) => {
  try {
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Product reviews
app.post('/api/products/:id/reviews', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { rating, comment, customerName } = req.body;
    
    const review = {
      id: uuidv4(),
      productId,
      rating,
      comment,
      customerName,
      createdAt: new Date()
    };
    
    reviews.push(review);
    res.json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

app.get('/api/products/:id/reviews', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productReviews = reviews.filter(r => r.productId === productId);
    res.json(productReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SS Stores API is running' });
});

app.listen(PORT, () => {
  console.log(`SS Stores API server running on port ${PORT}`);
});
