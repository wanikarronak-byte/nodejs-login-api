const connectDB = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const loginRoute = require("./routes/login");
const productRoute = require("./routes/products");

// Use Routes
app.use("/", loginRoute);
app.use("/products", productRoute);

// MongoDB Connection
connectDB(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});