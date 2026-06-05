const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
    console.log("Connected DB:", mongoose.connection.name);

  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
  }
};

module.exports = connectDB;