require('dotenv').config();
const connectDB = require('../server/src/config/db');
const app = require('../server/src/app');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
};
