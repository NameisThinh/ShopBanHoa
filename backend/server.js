const app = require("./app");
const connectDB = require("./config/database");

require("dotenv").config({ path: "backend/config/config.env" });
const cloudinary = require("cloudinary");

// Connecting to database
connectDB();

// Setting  cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT || 8000} in ${
      process.env.NODE_ENV
    }`
  );
});
