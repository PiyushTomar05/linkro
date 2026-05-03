require('dotenv').config();

// Top-level requires are essential — Vercel's nft (Node File Tracer)
// only traces static requires at the module level, not inside functions.
// These imports ensure Express, Mongoose, and all server deps get bundled.
const connectDB = require('../server/src/config/db');
const app = require('../server/src/app');

let dbConnected = false;

module.exports = async (req, res) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      console.error('[DB] Connection failed:', err.message);
      return res.status(500).json({ message: 'Database connection failed', error: err.message });
    }
  }

  return app(req, res);
};
