#!/usr/bin/env node

/**
 * Script to create .env file for the backend
 * Run with: node create-env.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSecret = () => {
  return crypto.randomBytes(32).toString('base64');
};

const envContent = `# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/careerai

# JWT Secrets
# Generated secure secrets - keep these safe!
JWT_SECRET=${generateSecret()}
JWT_REFRESH_SECRET=${generateSecret()}
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:8080
`;

const envPath = path.join(__dirname, '.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('   If you want to recreate it, delete the existing .env file first.');
  process.exit(1);
}

// Create .env file
try {
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('✅ .env file created successfully!');
  console.log('📝 Location: ' + envPath);
  console.log('\n⚠️  Important:');
  console.log('   - Keep your .env file secure and never commit it to git');
  console.log('   - Update MONGODB_URI if using MongoDB Atlas');
  console.log('   - Change JWT secrets in production!');
  console.log('\n🚀 You can now start the server with: npm run dev');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
}

