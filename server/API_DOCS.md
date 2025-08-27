# SS Stores Authentication API Documentation

This document provides comprehensive documentation for all authentication endpoints in the SS Stores API.

## Base URL
```
http://localhost:5000/api/auth
```

## Authentication
Most endpoints require JWT authentication via:
- **Cookie**: `token` (HTTP-only cookie)
- **Header**: `Authorization: Bearer <token>`

## Common Response Format
All endpoints return JSON responses with the following structure:
```json
{
  "success": boolean,
  "message": "string (optional)",
  "user": "object (when applicable)",
  "token": "string (when applicable)"
}
```

---

## Endpoints

### 1. Register User

**POST** `/api/auth/register`

Register a new user account.

**Access**: Public

#### Request Body
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)", 
  "email": "string (required)",
  "password": "string (required)",
  "phone": "string (optional)"
}
```

#### Success Response (201)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8b2c3d1e2f3a4b5c6d7e8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isEmailVerified": false,
    "preferences": {}
  }
}
```

#### Error Responses

**400 Bad Request** - Missing required fields
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

**400 Bad Request** - User already exists
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

**400 Bad Request** - Validation error
```json
{
  "success": false,
  "message": "Email must be valid, Password must be at least 6 characters"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server error during registration"
}
```

#### Example Request
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123",
    "phone": "+1234567890"
  }'
```

---

### 2. Login User

**POST** `/api/auth/login`

Authenticate user and receive JWT token.

**Access**: Public

#### Request Body
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8b2c3d1e2f3a4b5c6d7e8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isEmailVerified": false,
    "preferences": {}
  }
}
```

#### Error Responses

**400 Bad Request** - Missing credentials
```json
{
  "success": false,
  "message": "Please provide an email and password"
}
```

**401 Unauthorized** - Invalid credentials
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**401 Unauthorized** - Account locked
```json
{
  "success": false,
  "message": "Account is temporarily locked due to too many failed login attempts"
}
```

**401 Unauthorized** - Account deactivated
```json
{
  "success": false,
  "message": "Account has been deactivated"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server error during login"
}
```

#### Example Request
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

---

### 3. Logout User

**POST** `/api/auth/logout`

Clear authentication token and logout user.

**Access**: Private (requires authentication)

#### Request Body
No body required.

#### Success Response (200)
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Error Responses

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server error during logout"
}
```

#### Example Request
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 4. Get Current User

**GET** `/api/auth/me`

Retrieve current authenticated user's information.

**Access**: Private (requires authentication)

#### Request Body
No body required.

#### Success Response (200)
```json
{
  "success": true,
  "user": {
    "id": "64f8b2c3d1e2f3a4b5c6d7e8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "role": "user",
    "isEmailVerified": false,
    "preferences": {},
    "dateOfBirth": null,
    "gender": null,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "orders": []
  }
}
```

#### Error Responses

**401 Unauthorized** - No token provided
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server error fetching user data"
}
```

#### Example Request
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 5. Update User Details

**PUT** `/api/auth/updatedetails`

Update user profile information.

**Access**: Private (requires authentication)

#### Request Body
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "phone": "string (optional)",
  "dateOfBirth": "string (optional, ISO date)",
  "gender": "string (optional)"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "user": {
    "id": "64f8b2c3d1e2f3a4b5c6d7e8",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "gender": "male",
    "role": "user",
    "isEmailVerified": false,
    "preferences": {}
  }
}
```

#### Error Responses

**400 Bad Request** - Validation error
```json
{
  "success": false,
  "message": "Phone number must be valid, Date of birth must be a valid date"
}
```

**401 Unauthorized** - Not authenticated
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server error updating user details"
}
```

#### Example Request
```bash
curl -X PUT http://localhost:5000/api/auth/updatedetails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-15",
    "gender": "male"
  }'
```

---

### 6. Update Password

**PUT** `/api/auth/updatepassword`

Change user's password.

**Access**: Private (requires authentication)

#### Request Body
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required)"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8b2c3d1e2f3a4b5c6d7e8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isEmailVerified": false,
    "preferences": {}
  }
}
```

#### Error Responses

**400 Bad Request** - Missing passwords
```json
{
  "success": false,
  "message": "Please provide current and new password"
}
```

**401 Unauthorized** - Incorrect current password
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

**401 Unauthorized** - Not authenticated
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server error updating password"
}
```

#### Example Request
```bash
curl -X PUT http://localhost:5000/api/auth/updatepassword \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "currentPassword": "oldpassword123",
    "newPassword": "newsecurepassword456"
  }'
```

---

### 7. Forgot Password

**POST** `/api/auth/forgotpassword`

Request password reset token.

**Access**: Public

#### Request Body
```json
{
  "email": "string (required)"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "Password reset token generated",
  "resetToken": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
}
```

#### Error Responses

**404 Not Found** - User not found
```json
{
  "success": false,
  "message": "No user found with that email"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Email could not be sent"
}
```

#### Example Request
```bash
curl -X POST http://localhost:5000/api/auth/forgotpassword \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com"
  }'
```

#### Notes
- In production, the reset token should be sent via email instead of returned in the response
- Reset token expires in 10 minutes
- The actual reset URL format: `http://localhost:5000/api/auth/resetpassword/{resetToken}`

---

### 8. Reset Password

**PUT** `/api/auth/resetpassword/:resettoken`

Reset password using reset token.

**Access**: Public

#### URL Parameters
- `resettoken` (string, required): The reset token received from forgot password endpoint

#### Request Body
```json
{
  "password": "string (required)"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8b2c3d1e2f3a4b5c6d7e8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isEmailVerified": false,
    "preferences": {}
  }
}
```

#### Error Responses

**400 Bad Request** - Invalid or expired token
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server error resetting password"
}
```

#### Example Request
```bash
curl -X PUT http://localhost:5000/api/auth/resetpassword/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0 \
  -H "Content-Type: application/json" \
  -d '{
    "password": "mynewsecurepassword789"
  }'
```

---

## Status Codes Summary

| Code | Description |
|------|-------------|
| 200  | OK - Request successful |
| 201  | Created - User registered successfully |
| 400  | Bad Request - Invalid input or validation error |
| 401  | Unauthorized - Invalid credentials or not authenticated |
| 404  | Not Found - User not found |
| 500  | Internal Server Error - Server-side error |

## Security Features

### JWT Token
- **Expiration**: 30 days (configurable via `JWT_EXPIRE`)
- **Storage**: HTTP-only cookie + response body
- **Security**: Secure flag in production, SameSite strict

### Password Security
- Passwords are hashed using bcrypt
- Password validation on registration
- Current password verification for updates

### Account Protection
- Failed login attempt tracking
- Account locking after multiple failed attempts
- Account activation/deactivation support

### Token Management
- Automatic token refresh on password change
- Secure token invalidation on logout
- Reset token expiration (10 minutes)

## Error Handling

All endpoints implement comprehensive error handling:

1. **Validation Errors**: Input validation with detailed messages
2. **Authentication Errors**: Clear unauthorized access messages
3. **Server Errors**: Generic error messages to prevent information leakage
4. **Logging**: All errors are logged server-side for debugging

## Rate Limiting

Consider implementing rate limiting for:
- Login attempts (prevent brute force)
- Password reset requests (prevent spam)
- Registration attempts (prevent abuse)

## Testing

### Example Test Cases

```javascript
// Registration test
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'testpassword123'
  })
});

// Login test
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'testpassword123'
  })
});

// Protected route test
const meResponse = await fetch('/api/auth/me', {
  headers: { 
    'Authorization': `Bearer ${token}` 
  }
});
```

## Environment Variables

Required environment variables for authentication:

```env
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
NODE_ENV=development
```

## Integration Notes

### Frontend Integration
```javascript
// Login example
const login = async (email, password) => {
  const response = await axios.post('/api/auth/login', {
    email,
    password
  });
  
  // Token is automatically stored in HTTP-only cookie
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

// Authenticated request example
const getProfile = async () => {
  const response = await axios.get('/api/auth/me');
  return response.data.user;
};
```

### Middleware Usage
The authentication middleware should be applied to protected routes:

```javascript
// Example protected route
app.get('/api/protected', auth, (req, res) => {
  // req.user is available here
  res.json({ user: req.user });
});
```
