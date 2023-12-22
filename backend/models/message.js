const mongoose = require("mongoose");
const validator = require("validator");
const messageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên không được để trống"],
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true,
      validate: [validator.isEmail, "Vui lòng nhập địa chỉ email hợp lệ"],
    },
    phone: {
      type: Number,
      required: [true, "Phone không được để trống"],
    },
    message: {
      type: String,
      required: [true, "Tin nhan  không được để trống"],
    },
  
  },
  {
    collection: "Message",
  }
);
module.exports = mongoose.model("Message", messageSchema);
