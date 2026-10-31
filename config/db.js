const mongoose = require('mongoose');

dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nestfinder';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Check your MongoDB instance or create a local database on localhost:27017');
    throw error;
  }
};

module.exports = connectDB;
