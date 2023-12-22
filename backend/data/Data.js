const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("./Product.json");
const mainproduct = require("./MainProduct.json");
// Setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const dataProduct = async () => {
  // await Product.deleteMany();
  // console.log("Products are deleted");

  await Product.insertMany(mainproduct);
  console.log("Đã thêm tất cả sản phẩm");

  process.exit();
};

dataProduct();
