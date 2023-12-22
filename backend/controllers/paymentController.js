const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    // create content payment
    amount: req.body.amount,
    currency: "vnd",

    metadata: { integration_check: "accept_a_payment" }, // Các đối tượng Stripe có thể cập nhật — bao gồm Tài khoản , Khoản phí , Khách hàng , Nội dung thanh toán , Tiền hoàn lại , Đăng ký và Chuyển khoản —có thông số.
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret, // Json API client_secret
  });
});

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});




// router.post('/create_payment_url', function (req, res, next) {
//   var ipAddr = req.headers['x-forwarded-for'] ||
//       req.connection.remoteAddress ||
//       req.socket.remoteAddress ||
//       req.connection.socket.remoteAddress;

//   var config = require('config');
//   var dateFormat = require('dateformat');

  
//   var tmnCode = config.get('vnp_TmnCode');
//   var secretKey = config.get('vnp_HashSecret');
//   var vnpUrl = config.get('vnp_Url');
//   var returnUrl = config.get('vnp_ReturnUrl');

//   var date = new Date();

//   var createDate = dateFormat(date, 'yyyymmddHHmmss');
//   var orderId = dateFormat(date, 'HHmmss');
//   var amount = req.body.amount;
//   var bankCode = req.body.bankCode;
  
//   var orderInfo = req.body.orderDescription;
//   var orderType = req.body.orderType;
//   var locale = req.body.language;
//   if(locale === null || locale === ''){
//       locale = 'vn';
//   }
//   var currCode = 'VND';
//   var vnp_Params = {};
//   vnp_Params['vnp_Version'] = '2.1.0';
//   vnp_Params['vnp_Command'] = 'pay';
//   vnp_Params['vnp_TmnCode'] = tmnCode;
//   // vnp_Params['vnp_Merchant'] = ''
//   vnp_Params['vnp_Locale'] = locale;
//   vnp_Params['vnp_CurrCode'] = currCode;
//   vnp_Params['vnp_TxnRef'] = orderId;
//   vnp_Params['vnp_OrderInfo'] = orderInfo;
//   vnp_Params['vnp_OrderType'] = orderType;
//   vnp_Params['vnp_Amount'] = amount * 100;
//   vnp_Params['vnp_ReturnUrl'] = returnUrl;
//   vnp_Params['vnp_IpAddr'] = ipAddr;
//   vnp_Params['vnp_CreateDate'] = createDate;
//   if(bankCode !== null && bankCode !== ''){
//       vnp_Params['vnp_BankCode'] = bankCode;
//   }

//   vnp_Params = sortObject(vnp_Params);

//   var querystring = require('qs');
//   var signData = querystring.stringify(vnp_Params, { encode: false });
//   var crypto = require("crypto");     
//   var hmac = crypto.createHmac("sha512", secretKey);
//   var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
//   vnp_Params['vnp_SecureHash'] = signed;
//   vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

//   res.redirect(vnpUrl)
// });
