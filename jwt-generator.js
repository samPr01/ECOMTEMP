#!/usr/bin/env node

/**
 * JWT Token Generator Script
 * Generates secure JWT tokens with user payload and 7-day expiration
 * 
 * Usage:
 *   node jwt-generator.js [userId] [email] [role]
 *   node jwt-generator.js 12345 john@example.com admin
 * 
 * Requirements:
 *   - jsonwebtoken package
 *   - dotenv package
 *   - .env file with JWT_SECRET
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generate a secure JWT token
 * @param {Object} payload - User data to include in token
 * @returns {string} - Generated JWT token
 */
function generateJWT(payload) {
  // Check if JWT_SECRET exists
  if (!process.env.JWT_SECRET) {
    console.error('❌ Error: JWT_SECRET not found in environment variables');
    console.log('💡 Add JWT_SECRET to your .env file or generate one:');
    console.log('   JWT_SECRET=' + crypto.randomBytes(64).toString('hex'));
    process.exit(1);
  }

  // Token options
  const options = {
    expiresIn: '7d', // 7 days
    issuer: 'SS-Stores',
    audience: 'ss-stores-users'
  };

  try {
    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
  } catch (error) {
    console.error('❌ Error generating JWT:', error.message);
    process.exit(1);
  }
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded payload
 */
function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('❌ Error verifying JWT:', error.message);
    return null;
  }
}

/**
 * Main function - Parse command line arguments and generate token
 */
function main() {
  console.log('🔐 JWT Token Generator for SS-Stores');
  console.log('=====================================\n');

  // Parse command line arguments
  const args = process.argv.slice(2);
  
  let payload = {};

  if (args.length === 0) {
    // Default payload for testing
    payload = {
      id: '507f1f77bcf86cd799439011',
      email: 'test@example.com',
      role: 'customer',
      firstName: 'Test',
      lastName: 'User'
    };
    console.log('📝 No arguments provided. Using default test payload:');
  } else if (args.length >= 1) {
    // Custom payload from arguments
    payload.id = args[0];
    payload.email = args[1] || 'user@example.com';
    payload.role = args[2] || 'customer';
    payload.firstName = args[3] || 'User';
    payload.lastName = args[4] || 'Name';
    
    console.log('📝 Using provided payload:');
  }

  // Display payload
  console.log(JSON.stringify(payload, null, 2));
  console.log();

  // Generate token
  console.log('🔄 Generating JWT token...');
  const token = generateJWT(payload);

  // Display results
  console.log('✅ JWT Token generated successfully!\n');
  console.log('🎫 Token:');
  console.log(token);
  console.log();

  // Verify token
  console.log('🔍 Verifying token...');
  const decoded = verifyJWT(token);
  
  if (decoded) {
    console.log('✅ Token verification successful!');
    console.log('📋 Decoded payload:');
    console.log(JSON.stringify(decoded, null, 2));
    console.log();
    
    // Calculate expiration
    const expirationDate = new Date(decoded.exp * 1000);
    console.log('⏰ Token expires on:', expirationDate.toLocaleString());
    console.log('⏳ Time until expiration:', Math.round((decoded.exp * 1000 - Date.now()) / (1000 * 60 * 60 * 24)), 'days');
  }

  console.log('\n🔗 Usage in your application:');
  console.log('   Authorization: Bearer ' + token);
  console.log('\n📝 Copy this token to test your authentication endpoints!');
}

// Handle command line help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🔐 JWT Token Generator for SS-Stores
====================================

Usage:
  node jwt-generator.js [userId] [email] [role] [firstName] [lastName]

Examples:
  node jwt-generator.js
  node jwt-generator.js 12345
  node jwt-generator.js 12345 john@example.com
  node jwt-generator.js 12345 john@example.com admin
  node jwt-generator.js 12345 john@example.com admin John Doe

Environment Variables Required:
  JWT_SECRET - Secret key for signing tokens (add to .env file)

Installation:
  npm install jsonwebtoken dotenv

Options:
  --help, -h    Show this help message
  --generate    Generate a new JWT_SECRET
`);
  process.exit(0);
}

// Generate JWT_SECRET
if (process.argv.includes('--generate')) {
  console.log('🔑 Generated JWT_SECRET:');
  console.log('JWT_SECRET=' + crypto.randomBytes(64).toString('hex'));
  console.log('\n💡 Add this to your .env file');
  process.exit(0);
}

// Run the main function
if (require.main === module) {
  main();
}

module.exports = { generateJWT, verifyJWT };
