#!/usr/bin/env node

/**
 * Utility script to generate secure JWT secrets
 * Run with: node generate-secrets.js
 */

import crypto from 'crypto';

const generateSecret = () => {
  return crypto.randomBytes(32).toString('base64');
};

console.log('\n🔐 Generate Secure JWT Secrets\n');
console.log('Copy these to your .env file:\n');
console.log(`JWT_SECRET=${generateSecret()}`);
console.log(`JWT_REFRESH_SECRET=${generateSecret()}`);
console.log('\n✅ Secrets generated! Make sure to keep them secure.\n');

