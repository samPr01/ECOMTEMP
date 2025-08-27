# SS Stores - React Frontend

A modern React frontend for the SS Stores e-commerce platform built with React 18, featuring a component-based architecture, context state management, and seamless backend integration.

## 🏗️ Architecture Overview

The frontend follows a modular React architecture with:
- **Component-based design** for reusability
- **Context API** for global state management
- **Custom hooks** for shared logic
- **Page-based routing** with React Router
- **Proxy configuration** for API communication

## 📁 Project Structure

```
client/src/
├── components/           # Reusable UI components
│   ├── Layout/          # Layout components (Header, Footer)
│   ├── auth/            # Authentication components
│   └── ProductCard.js   # Product display component
├── pages/               # Page components (route handlers)
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── App.js              # Main application component
├── index.js            # Application entry point
├── setupProxy.js       # Development proxy configuration
└── *.css               # Component styles
```

## 🧩 Components

### Layout Components

#### `Header.js`
- **Purpose**: Main navigation header with cart, search, and user menu
- **Features**: 
  - Responsive navigation menu
  - Cart item count display
  - User authentication status
  - Search functionality
  - Category navigation
- **Props**: None (uses context)
- **Context Used**: `AuthContext`, `CartContext`

#### `Footer.js`
- **Purpose**: Site footer with links and company information
- **Features**: 
  - Company information
  - Quick links
  - Social media links
  - Newsletter signup
- **Props**: None

### Authentication Components

#### `Login.js`
- **Purpose**: User login form
- **Features**:
  - Email/password validation
  - Error handling
  - Remember me functionality
  - Redirect after login
- **Props**: None
- **Context Used**: `AuthContext`

#### `Register.js`
- **Purpose**: User registration form
- **Features**:
  - Multi-field validation
  - Password confirmation
  - Terms acceptance
  - Auto-login after registration
- **Props**: None
- **Context Used**: `AuthContext`

#### `ProtectedRoute.js`
- **Purpose**: Route protection for authenticated users
- **Features**:
  - Authentication check
  - Admin role verification
  - Automatic redirects
- **Props**: `children` (components to protect)
- **Context Used**: `AuthContext`

#### `LogoutButton.js`
- **Purpose**: User logout functionality
- **Features**:
  - Logout confirmation
  - Session cleanup
  - Redirect to home
- **Props**: None
- **Context Used**: `AuthContext`

### Product Components

#### `ProductCard.js`
- **Purpose**: Reusable product display card
- **Features**:
  - Product image display
  - Price and rating
  - Add to cart button
  - Quick view option
- **Props**: 
  - `product` (object): Product data
  - `onAddToCart` (function): Cart addition handler
- **Context Used**: `CartContext`

## 📄 Pages

### `Home.js`
- **Purpose**: Landing page with featured products
- **Features**:
  - Hero section
  - Featured products grid
  - Category highlights
  - Promotional banners

### `Products.js`
- **Purpose**: Product catalog with filtering and search
- **Features**:
  - Product grid display
  - Category filtering
  - Search functionality
  - Pagination
  - Sort options

### `ProductDetail.js`
- **Purpose**: Individual product details page
- **Features**:
  - Product image gallery
  - Detailed description
  - Size/variant selection
  - Add to cart functionality
  - Related products
  - Customer reviews

### `Cart.js`
- **Purpose**: Shopping cart management
- **Features**:
  - Cart item list
  - Quantity adjustment
  - Item removal
  - Price calculation
  - Checkout button

### `Checkout.js`
- **Purpose**: Order placement and payment
- **Features**:
  - Shipping information form
  - Payment method selection
  - Order summary
  - Order confirmation

### `OrderConfirmation.js`
- **Purpose**: Post-purchase confirmation
- **Features**:
  - Order details display
  - Tracking information
  - Download receipt
  - Continue shopping

### `Profile.js`
- **Purpose**: User account management
- **Features**:
  - Personal information editing
  - Order history
  - Address management
  - Password change

### `Admin.js`
- **Purpose**: Administrative dashboard
- **Features**:
  - Product management
  - Order management
  - User management
  - Analytics dashboard
- **Access**: Admin users only

## 🔄 Context & State Management

### AuthContext

**Purpose**: Global authentication state management

**State Properties**:
```javascript
{
  user: null,              // Current user object
  token: null,             // JWT authentication token
  isAuthenticated: false,  // Authentication status
  loading: true,           // Loading state
  error: null             // Error messages
}
```

**Available Actions**:
- `LOGIN_START` / `LOGIN_SUCCESS` / `LOGIN_FAILURE`
- `REGISTER_START` / `REGISTER_SUCCESS` / `REGISTER_FAILURE`
- `LOGOUT`
- `LOAD_USER`
- `UPDATE_USER`
- `CLEAR_ERROR`
- `SET_LOADING`

**Methods Provided**:
- `login(email, password)` - User authentication
- `register(userData)` - User registration
- `logout()` - User logout
- `updateProfile(userData)` - Profile updates
- `clearError()` - Error clearing

**Usage Example**:
```javascript
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Component logic here
};
```

### CartContext

**Purpose**: Shopping cart state management

**State Properties**:
```javascript
{
  items: [],      // Cart items array
  total: 0,       // Total price
  count: 0,       // Item count
  loading: false  // Loading state
}
```

**Available Actions**:
- `SET_CART` - Set entire cart state
- `SET_LOADING` - Set loading state
- `ADD_ITEM` - Add item to cart
- `CLEAR_CART` - Clear all items

**Methods Provided**:
- `addToCart(productId, quantity, size)` - Add product to cart
- `updateCartItem(itemId, quantity)` - Update item quantity
- `removeFromCart(itemId)` - Remove item from cart
- `clearCart()` - Clear entire cart
- `fetchCart()` - Refresh cart from server

## 🪝 Custom Hooks

### `useAuth`

**Purpose**: Simplified access to authentication context

**Returns**: All AuthContext values and methods

**Usage**:
```javascript
import { useAuth } from '../hooks/useAuth';

const { user, isAuthenticated, login, logout } = useAuth();
```

**Error Handling**: Throws error if used outside AuthProvider

## 🌐 API Integration

### Proxy Configuration

The `setupProxy.js` file configures development proxy:
```javascript
// Proxies /api requests to http://localhost:5000
app.use("/api", createProxyMiddleware({
  target: "http://localhost:5000",
  changeOrigin: true,
}));
```

### API Communication Patterns

#### Authentication Requests
```javascript
// Login example
const response = await axios.post('/api/auth/login', {
  email,
  password
});
```

#### Product Requests
```javascript
// Fetch products with filters
const response = await axios.get('/api/products', {
  params: {
    category,
    search,
    page,
    limit
  }
});
```

#### Cart Requests
```javascript
// Add to cart
const response = await axios.post('/api/cart/add', {
  sessionId,
  productId,
  quantity,
  size
});
```

### Error Handling

Global error handling patterns:
```javascript
try {
  const response = await axios.post('/api/endpoint', data);
  // Handle success
} catch (error) {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data.message;
    toast.error(message);
  } else {
    // Network or other error
    toast.error('Something went wrong');
  }
}
```

## 🎨 Styling

### CSS Organization
- **Global styles**: `index.css` - Base styles and CSS variables
- **Component styles**: Individual `.css` files for components
- **Responsive design**: Mobile-first approach with media queries

### CSS Variables
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  --text-color: #333;
  --background-color: #f8f9fa;
}
```

## 🔧 Development Workflow

### Starting Development
```bash
# From client directory
npm start

# Or from root directory
npm run client
```

### Adding New Components

1. **Create component file** in appropriate directory
2. **Follow naming convention**: PascalCase for components
3. **Add corresponding CSS file** if needed
4. **Export from component file**
5. **Import where needed**

Example component structure:
```javascript
import React from 'react';
import './MyComponent.css';

const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

### Adding New Pages

1. **Create page component** in `src/pages/`
2. **Add route** in `App.js`
3. **Add navigation links** if needed
4. **Handle authentication** if required

Example route addition:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

### State Management Guidelines

1. **Use Context** for global state (auth, cart)
2. **Use useState** for local component state
3. **Use useReducer** for complex state logic
4. **Keep state close** to where it's used

### API Integration Guidelines

1. **Use axios** for HTTP requests
2. **Handle loading states** appropriately
3. **Implement error handling** for all requests
4. **Use toast notifications** for user feedback
5. **Follow RESTful conventions**

## 🚀 Building for Production

```bash
# Build optimized production bundle
npm run build

# Serve build locally for testing
npx serve -s build
```

## 📦 Dependencies

### Core Dependencies
- **react**: ^18.2.0 - Core React library
- **react-dom**: ^18.2.0 - React DOM rendering
- **react-router-dom**: ^6.8.1 - Client-side routing
- **axios**: ^1.3.4 - HTTP client
- **styled-components**: ^5.3.9 - CSS-in-JS styling

### UI Dependencies
- **react-icons**: ^4.8.0 - Icon library
- **react-toastify**: ^9.1.1 - Toast notifications
- **react-helmet**: ^6.1.0 - Document head management

### Utilities
- **uuid**: ^9.0.0 - Unique ID generation

## 🔍 Testing

### Testing Structure
- Component tests in `__tests__` directories
- Use React Testing Library for component testing
- Jest for test runner

### Running Tests
```bash
npm test
```

## 🐛 Common Issues & Solutions

### 1. Proxy Issues
**Problem**: API calls not reaching backend
**Solution**: Check `setupProxy.js` configuration and ensure backend is running on correct port

### 2. Context Errors
**Problem**: "useAuth must be used within an AuthProvider"
**Solution**: Ensure component is wrapped in AuthProvider in component tree

### 3. Routing Issues
**Problem**: Page not found or routing not working
**Solution**: Check route definitions in `App.js` and ensure React Router is properly configured

### 4. State Not Updating
**Problem**: Component not re-rendering after state change
**Solution**: Ensure state updates are immutable and follow React patterns

## 📚 Best Practices

### Component Design
- Keep components small and focused
- Use functional components with hooks
- Implement proper prop validation
- Follow single responsibility principle

### State Management
- Minimize global state
- Use local state when possible
- Implement proper error boundaries
- Handle loading states consistently

### Performance
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images and assets
- Use proper key props in lists

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios

This documentation provides a comprehensive guide to understanding and working with the SS Stores React frontend. For specific implementation details, refer to the individual component files and their inline documentation.
