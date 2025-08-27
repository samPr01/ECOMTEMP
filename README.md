# SS Stores - E-commerce Website

A fully functional, responsive e-commerce website built with React and Node.js.

## Features

- 🛍️ Product catalog with 1500+ items across 7 categories
- 🛒 Shopping cart with add/remove/update functionality
- 💳 Complete checkout flow with order confirmation
- 📱 Responsive design for all devices
- 🔍 Product search and filtering
- ⭐ Customer reviews system
- 👨‍💼 Admin dashboard for product and order management
- 📧 Email order confirmations
- 🎨 Modern, branded design

## Categories

- Menswear
- Womenwear
- Footwear
- Home
- Electronics
- Lifestyle
- Fitness

## Quick Start

1. Install all dependencies:
   ```bash
   npm run install-all
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
ss-stores/
├── client/          # React frontend
├── server/          # Node.js backend
├── package.json     # Root package file
└── README.md        # This file
```

## Tech Stack

- **Frontend**: React, React Router, Axios, Styled Components
- **Backend**: Node.js, Express, MongoDB/JSON storage
- **Styling**: CSS3, Flexbox, Grid
- **Icons**: React Icons
- **Email**: Nodemailer

## Admin Access

Access the admin dashboard at `/admin` to manage products and view orders.

## Detailed Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (for database)
- **Git** (for version control)

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd ECOMTEMP
   ```

2. **Install dependencies for all packages:**
   ```bash
   npm run install-all
   ```
   This will install dependencies for root, server, and client directories.

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the server directory
   - Configure all required environment variables (see Environment Configuration section)

4. **Set up MongoDB Atlas:**
   - Follow the MongoDB Atlas setup guide below
   - Add your connection string to the `.env` file

5. **Generate JWT secret:**
   ```bash
   node jwt-generator.js
   ```
   Copy the generated secret to your `.env` file.

6. **Start the development servers:**
   ```bash
   npm run dev
   ```

## Environment Configuration

### Server Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ss-stores?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@ssstores.com
FROM_NAME=SS Stores

# File Upload Configuration
MAX_FILE_UPLOAD=1000000
FILE_UPLOAD_PATH=./public/uploads
```

### Client Environment Variables

Create a `.env` file in the `client/` directory (optional):

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000

# App Configuration
REACT_APP_NAME=SS Stores
REACT_APP_VERSION=1.0.0
```

## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### 2. Create a Cluster

1. Click "Create a Cluster"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Name your cluster (e.g., "ss-stores-cluster")
5. Click "Create Cluster"

### 3. Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Create a username and secure password
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### 4. Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add your specific IP addresses
5. Click "Confirm"

### 5. Get Connection String

1. Go to **Clusters** and click "Connect"
2. Choose "Connect your application"
3. Select **Node.js** and version **4.1 or later**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `ss-stores`

Example connection string:
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/ss-stores?retryWrites=true&w=majority
```

## JWT Configuration

### Generating JWT Secret

Use the included JWT generator:

```bash
node jwt-generator.js
```

This will generate a cryptographically secure secret. Copy the output to your `.env` file.

### Manual JWT Secret Generation

Alternatively, generate a secure secret manually:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

### JWT Configuration Options

- **JWT_SECRET**: Your secret key (keep this secure!)
- **JWT_EXPIRE**: Token expiration time (e.g., '30d', '7d', '24h')
- **JWT_COOKIE_EXPIRE**: Cookie expiration in days

## Development Workflow

### Starting Development

1. **Start both servers concurrently:**
   ```bash
   npm run dev
   ```

2. **Start servers individually:**
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

### Making Changes

1. **Frontend changes**: Saved automatically with hot reload
2. **Backend changes**: Automatically restart with nodemon
3. **Database changes**: Restart server if schema changes

### Building for Production

```bash
# Build the React app
npm run build

# The build files will be in client/build/
```

### Git Workflow

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add feature: description"

# Push to remote
git push origin main
```

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Issues

**Error**: `MongoNetworkError: failed to connect to server`

**Solutions**:
- Check your MongoDB Atlas connection string
- Verify network access settings (IP whitelist)
- Ensure database user credentials are correct
- Check if your internet connection is stable

#### 2. JWT Token Issues

**Error**: `JsonWebTokenError: invalid token`

**Solutions**:
- Verify JWT_SECRET is set in environment variables
- Clear browser cookies and localStorage
- Check token expiration settings
- Ensure consistent JWT_SECRET across environments

#### 3. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or use a different port in your .env file
PORT=5001
```

#### 4. Module Not Found Errors

**Error**: `Cannot find module 'xyz'`

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or reinstall all dependencies
npm run install-all
```

#### 5. CORS Issues

**Error**: `Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solutions**:
- Check CORS configuration in `server/index.js`
- Verify CLIENT_URL in server `.env` file
- Ensure proxy setting in `client/package.json`

#### 6. Environment Variables Not Loading

**Solutions**:
- Check `.env` file location (should be in server/ directory)
- Verify `.env` file format (no spaces around =)
- Restart the server after changing `.env`
- Check if `.env` is in `.gitignore`

### Performance Issues

#### Slow Database Queries
- Check MongoDB Atlas cluster region
- Add database indexes for frequently queried fields
- Monitor query performance in Atlas dashboard

#### Slow Frontend Loading
- Check network tab in browser dev tools
- Optimize image sizes and formats
- Consider implementing lazy loading

### Getting Help

1. **Check the console**: Look for error messages in browser console and terminal
2. **Review logs**: Check server logs for detailed error information
3. **Database logs**: Monitor MongoDB Atlas logs for database issues
4. **Network issues**: Use browser dev tools to inspect API calls

### Development Tips

- Use **React Developer Tools** browser extension
- Use **MongoDB Compass** for database visualization
- Enable **verbose logging** during development
- Keep **environment variables** secure and never commit them

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:token` - Reset password

### Product Endpoints

- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories
- `GET /api/products/featured` - Get featured products

### Cart Endpoints

- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/:sessionId` - Get cart items
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove cart item

### Order Endpoints

- `POST /api/orders` - Place new order
- `GET /api/orders/:orderId` - Get order details
