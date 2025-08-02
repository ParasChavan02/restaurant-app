const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas cloud database or local MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://gildedspoon:gildedspoon123@cluster0.mongodb.net/gilded-spoon-restaurant?retryWrites=true&w=majority';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Trying to connect to local MongoDB...');
    
    try {
      // Fallback to local MongoDB
      const localURI = 'mongodb://localhost:27017/gilded-spoon-restaurant';
      const conn = await mongoose.connect(localURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Local MongoDB Connected: ${conn.connection.host}`);
    } catch (localError) {
      console.error(`Local MongoDB Connection Error: ${localError.message}`);
      console.log('Please ensure MongoDB is running locally or set MONGO_URI environment variable');
      // Don't exit process, let the app continue without database
    }
  }
};

module.exports = connectDB;
