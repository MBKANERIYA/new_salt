// firebaseAdmin.js
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let serviceAccount;

// Check if credentials are provided via environment variables (for Vercel/Production)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT environment variable:", error);
  }
} else {
  // Fallback to local JSON file for development
  const serviceAccountPath = path.join(__dirname, '../firebase-adminsdk.json');
  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath);
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.warn("WARNING: Firebase Admin credentials not found. Set FIREBASE_SERVICE_ACCOUNT env var in Vercel.");
  // Initialize without credentials so the build doesn't crash, but firebase admin features will fail if called
  admin.initializeApp();
}

module.exports = admin;
