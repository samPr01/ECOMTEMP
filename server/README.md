# SS-Stores Authentication Backend

A production-ready Node.js/Express backend with MongoDB Atlas integration for user authentication and management.

## Features

- **User Authentication**: Registration, login, logout with JWT tokens
- **Password Security**: Bcrypt hashing with salt rounds
- **Account Security**: Login attempt limiting, account locking
- **Password Reset**: Secure token-based password reset
- **User Management**: Profile updates, preferences, addresses
- **Role-Based Access**: Customer, admin, moderator roles
- **MongoDB Integration**: Mongoose ODM with robust error handling
- **Production Ready**: Comprehensive logging, validation, security

## Installation

1. **Install Dependencies**
```bash
cd server
npm install
```

2. **Environment Setup**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your MongoDB Atlas connection string and JWT secret
```

3. **MongoDB Atlas Setup**
- Create a MongoDB Atlas cluster
- Get your connection string
- Add it to your `.env` file as `MONGO_URI`

## Environment Variables

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ss-stores

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Server
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| POST | `/logout` | User logout | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/updatedetails` | Update user profile | Private |
| PUT | `/updatepassword` | Change password | Private |
| POST | `/forgotpassword` | Request password reset | Public |
| PUT | `/resetpassword/:token` | Reset password | Public |

### Example Requests

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Login User**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User**
```bash
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

## User Model Schema

```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  dateOfBirth: Date,
  gender: String (enum),
  addresses: [AddressSchema],
  preferences: {
    newsletter: Boolean,
    notifications: Object,
    currency: String,
    language: String
  },
  role: String (enum: customer, admin, moderator),
  isActive: Boolean,
  isEmailVerified: Boolean,
  wishlist: [ObjectId],
  orders: [ObjectId],
  // Security fields
  loginAttempts: Number,
  lockUntil: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}
```

## Security Features

- **Password Hashing**: Bcrypt with 12 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Account Locking**: Automatic lockout after 5 failed attempts
- **Rate Limiting**: Login attempt tracking
- **Secure Cookies**: HTTP-only, secure cookies in production
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error responses

## Middleware

- **Authentication**: `protect` middleware for private routes
- **Authorization**: `authorize` middleware for role-based access
- **Optional Auth**: `optionalAuth` for enhanced user experience

## Usage

1. **Start the server**
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

2. **Test authentication**
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Integration with Frontend

The backend is configured to work with your React frontend:

- **CORS**: Configured for `http://localhost:3000`
- **Cookies**: Supports credential-based requests
- **Proxy**: Works with your existing `setupProxy.js`

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas IP whitelist
4. Set up proper CORS origins
5. Enable HTTPS for secure cookies
6. Consider rate limiting middleware
7. Set up proper logging and monitoring

## File Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── authController.js  # Authentication logic
├── middleware/
│   └── auth.js           # JWT middleware
├── models/
│   └── User.js           # User schema
├── routes/
│   └── auth.js           # Auth routes
├── .env.example          # Environment template
├── index.js              # Server entry point
└── README.md             # This file
```
