const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = () => {
  mongoose
    .connect(
      // process.env.DB_URI,
      process.env.DB_LOCAL,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    )
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    })
    .catch((err) => {
      console.log("Loi connect");
    });
};

module.exports = connectDB;
