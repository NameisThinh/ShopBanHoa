const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const nodemailer = require('nodemailer')
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  if (!name) {
    return next(new ErrorHandler("Tên không được để trống", 401));
  }
  if (!email) {
    return next(new ErrorHandler("Email không được để trống", 401));
  }
  if (!password) {
    return next(new ErrorHandler("Mật khẩu không được để trống", 401));
  }
  if (!avatar) {
    return next(new ErrorHandler("Hình đại diện không được để trống", 401));
  }

  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  sendToken(user, 200, res);
});

// Login User  =>  /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Email và Mật khẩu không được để trống", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Email không tồn tại", 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Mật khẩu không đúng", 401));
  }

  sendToken(user, 200, res);
});

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const users = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await users.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Mật khẩu cũ không đúng"));
  }

  users.password = req.body.password;
  await users.save();

  sendToken(users, 200, res);
});

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Đã đăng xuất",
  });
});

// Admin Routes

// Get all users   =>   /api/v1/admin/users
exports.GetAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`Không tìm thấy người dùng có id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user
  });
});

exports.forgotPassword = catchAsyncErrors( async(req,res)=>{
  try {
    const { user_email } = req.body;
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(400).send({ message: 'Sorry Email does not Exist!' });
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: '587',
      auth: {
        user: 'quocthinh00123@gmail.com',
        pass: '0382510848',
      },
      secureConnection: 'false',
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: 'quocthinh00123@gmail.com',
      to: user_email,
      subject: 'Please Reset your Password',
      html: '<h3>Dear User</h3><p>You have requested to Reset your password. To Reset your password Successfully, Follow the Link bellow to Reset it</p><p>Click <a href="https://localhost/user/resetPassword.jsps">https://onepercentsoft.oxygen.com/user/resetPassword.jsp</a></p><p>This Email is subject to mandatory instruction.</p><p>Regards,</p><p>Online Service</p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) throw error;
      return res.send({ error: false, data: info, message: 'OK' });
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
})
