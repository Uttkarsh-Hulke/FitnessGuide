const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitguide';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.warn('[MongoDB] Falling back to graceful offline/memory-cache handling if required.');
    return null;
  }
};

const getDBStatus = () => {
  return {
    connected: isConnected,
    state: mongoose.connection.readyState, // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    database: mongoose.connection.name || 'fitguide'
  };
};

module.exports = { connectDB, getDBStatus };
