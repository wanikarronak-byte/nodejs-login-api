require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./Models/Product");

async function insertProducts() {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    const products = [];

    for (let i = 1; i <= 50; i++) {
      products.push({
        product_id: i,
        title: `Electronic Product ${i}`,
        description: `Description for Electronic Product ${i}`,
        price: 1000 + i * 500,
        delivery_date: `${(i % 5) + 1} Days`,
        image: `https://picsum.photos/300?elctronic applancies=${i}`
      });
    }

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("✅ 50 Products Inserted Successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

insertProducts();