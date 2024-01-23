// Generate a random secret key
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);
