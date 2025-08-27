# JWT Token Generator for SS-Stores

A secure Node.js script to generate and verify JWT tokens for testing and development purposes.

## 📦 Installation

First, ensure you have the required packages installed:

```bash
# Navigate to your project directory
cd c:\Users\dell\CascadeProjects\SS-Stores

# Install required packages
npm install jsonwebtoken dotenv
```

## 🔑 Environment Setup

1. **Generate a JWT Secret** (if you haven't already):
```bash
node jwt-generator.js --generate
```

2. **Update your .env file** with the generated secret:
```env
JWT_SECRET=your-generated-secret-here
```

## 🚀 Usage

### Basic Usage (Windows PowerShell/Command Prompt)

```bash
# Generate token with default test user
node jwt-generator.js

# Generate token with custom user ID
node jwt-generator.js 12345

# Generate token with user ID and email
node jwt-generator.js 12345 john@example.com

# Generate token with full user details
node jwt-generator.js 12345 john@example.com admin John Doe
```

### Command Examples

```bash
# Test user token
node jwt-generator.js

# Customer token
node jwt-generator.js 507f1f77bcf86cd799439011 customer@example.com customer Jane Smith

# Admin token
node jwt-generator.js 507f1f77bcf86cd799439012 admin@example.com admin Admin User

# Get help
node jwt-generator.js --help

# Generate new JWT secret
node jwt-generator.js --generate
```

## 📋 Output Example

```
🔐 JWT Token Generator for SS-Stores
=====================================

📝 Using provided payload:
{
  "id": "12345",
  "email": "john@example.com",
  "role": "admin",
  "firstName": "John",
  "lastName": "Doe"
}

🔄 Generating JWT token...
✅ JWT Token generated successfully!

🎫 Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaWF0IjoxNzM1MjgxMzA1LCJleHAiOjE3MzU4ODYxMDUsImlzcyI6IlNTLVN0b3JlcyIsImF1ZCI6InNzLXN0b3Jlcy11c2VycyJ9.example

🔍 Verifying token...
✅ Token verification successful!
📋 Decoded payload:
{
  "id": "12345",
  "email": "john@example.com",
  "role": "admin",
  "firstName": "John",
  "lastName": "Doe",
  "iat": 1735281305,
  "exp": 1735886105,
  "iss": "SS-Stores",
  "aud": "ss-stores-users"
}

⏰ Token expires on: 1/2/2025, 11:08:25 AM
⏳ Time until expiration: 7 days

🔗 Usage in your application:
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

📝 Copy this token to test your authentication endpoints!
```

## 🧪 Testing Your Authentication

Use the generated token to test your SS-Stores authentication endpoints:

### Test Protected Routes

```bash
# Test getting current user
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:5000/api/auth/me

# Test with cookie (if using cookie authentication)
curl -H "Cookie: token=YOUR_TOKEN_HERE" http://localhost:5000/api/auth/me
```

### Postman/Thunder Client Testing

1. Copy the generated token
2. Add to Authorization header: `Bearer YOUR_TOKEN_HERE`
3. Test your protected endpoints

## 🔧 Features

- **Secure Token Generation**: Uses environment-based JWT secrets
- **7-Day Expiration**: Tokens expire in exactly 7 days
- **Payload Verification**: Automatically verifies generated tokens
- **Flexible Input**: Accept various user details via command line
- **Security Validation**: Checks for JWT_SECRET existence
- **Cross-Platform**: Works on Windows PowerShell, Command Prompt, and Unix systems

## 🛡️ Security Notes

- **Never commit your JWT_SECRET** to version control
- **Use strong, random secrets** (64+ characters)
- **Rotate secrets regularly** in production
- **Store secrets securely** in environment variables

## 📁 File Structure

```
SS-Stores/
├── jwt-generator.js          # JWT generation script
├── README-JWT-Generator.md   # This documentation
├── .env                      # Environment variables (JWT_SECRET)
└── server/
    ├── config/db.js         # MongoDB connection
    ├── controllers/authController.js
    └── middleware/auth.js    # JWT verification middleware
```

## 🐛 Troubleshooting

### Common Issues

1. **"JWT_SECRET not found"**
   - Run: `node jwt-generator.js --generate`
   - Add the generated secret to your `.env` file

2. **"Module not found: jsonwebtoken"**
   - Run: `npm install jsonwebtoken dotenv`

3. **"Error verifying JWT"**
   - Ensure your JWT_SECRET matches between generation and verification
   - Check token hasn't expired

### Windows-Specific Notes

- Use PowerShell or Command Prompt
- Ensure Node.js is installed and in PATH
- Use forward slashes or escaped backslashes in paths
