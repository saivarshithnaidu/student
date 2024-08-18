const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Localhost connection string
    const conn = await mongoose.connect('mongodb://localhost:27017/psv-university', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
