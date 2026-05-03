// Minimal diagnostic endpoint - no external deps except built-in Node
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    ok: true,
    env: {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      MONGO_URI: process.env.MONGO_URI ? 'SET ✓' : 'NOT SET ✗',
      JWT_SECRET: process.env.JWT_SECRET ? 'SET ✓' : 'NOT SET ✗',
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? 'SET ✓' : 'NOT SET ✗',
    }
  }));
};
