const jwt = require("jsonwebtoken");
const asyncHandler = require("../asyncHandler/async");
const ErrorResponse = require("../errorHanderMiddleware/errorResponse");
const User = require("../../apis/authModule/user.model");
const { authUser } = require("../../apis/authModule/auth.controller");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  //   Make sure token exists

  if (!token) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authUser = await User.findOne({ email: decoded.user }).select('xroles');
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized", 401));
  }
});

// Roles and permission middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.authUser.xroles)) {
      return next(new ErrorResponse(`User role ${req.authUser.xroles} is not authorized to access this route`, 403))
    }
    next();
  }
}