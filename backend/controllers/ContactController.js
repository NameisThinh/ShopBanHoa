const Message = require("../models/message");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//Them tin nhan -->  /api/v1/message/new
exports.addMessage = (async (req, res, next) => {
    const { name, email, phone, message } = req.body;

  const newMessage = await Message.create({ name, email, phone, message });
  res.status(200).json({
    success: true,
    newMessage,
  });
  
});

//Get all message  =>   /api/v1/message
exports.getMessage = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

// Get all message (Admin)  =>   /api/v1/admin/message
exports.getAdminMessage = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    messages,
  });
});
