const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = () => {
  mongoose
    .connect(
      // "mongodb+srv://quocthinh00123:quocthinh00123@meomeo.joed2ms.mongodb.net/?retryWrites=true&w=majority",
      // process.env.DB_LOCAL,
      process.env.DB_URI,
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
    });
};

module.exports = connectDB;
