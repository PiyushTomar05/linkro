const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Fail fast in serverless
            socketTimeoutMS: 10000,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        throw err; // Let the caller handle the error — never call process.exit in serverless
    }
};

module.exports = connectDB;
