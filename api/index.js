require('dotenv').config();

let app;
let isConnected = false;

module.exports = async (req, res) => {
  try {
    // Lazy-load to catch module errors
    if (!app) {
      const connectDB = require('../server/src/config/db');
      app = require('../server/src/app');

      if (!isConnected) {
        await connectDB();
        isConnected = true;
      }
    }

    return app(req, res);
  } catch (error) {
    console.error('[Serverless] Fatal error:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
      stack: error.stack
    });
  }
};
