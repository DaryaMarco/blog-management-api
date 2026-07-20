const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError")

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("TOKEN:", token);

    if (!token) {
          throw new AppError(
                "No token, access denied",
                401
            );  
      }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
//  فقط در Production معمولاً یک مرحله اضافه می‌کنند
// به جای:
// req.user = decoded;
// می‌روند دیتابیس:
// const user = await User.findById(decoded.id);
// req.user = user;
// چون اگر نقش کاربر عوض شود:
// مثلاً:
// user → admin
// توکن قدیمی هنوز role قبلی را دارد.
// const user = await User.findById(decoded.id);
// req.user = user;

    next();
  } catch (error) {
        throw error
           }
};

module.exports = auth;