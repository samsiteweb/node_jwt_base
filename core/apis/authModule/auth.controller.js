const User = require("./user.model");
const asyncHandler = require("../../../core/common/asyncHandler/async");
const ErrorResponse = require("../../../core/common/errorHanderMiddleware/errorResponse");
const { successResponse, failResponse } = require("../../../core/common/responseHandler/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("express");
const axios = require("axios");


exports.createAnAccount = asyncHandler(async (req, res) => {
  // check if user exist before 
  let payload = {
    ...req.body,
    email: req.body.email.toLowerCase(),
    hashP: req.body.password
  }
  let checkUser = await User.findOne({ email: payload.email })
  if (checkUser) {
    return failResponse(res, "User already exit")
  }
  let createUser = await User.create(payload)
  if (createUser) {
    successResponse(res, '', 'Account Creation Successful')
  }
})

exports.accountSignIn = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  email = email.toLowerCase()

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  const authUser = await User.findOne({ email: email.toLowerCase() }).select('+hashP');

  if (!authUser) {
    return next(new ErrorResponse("invalid credentials", 401));
  }
  const isMatch = await authUser.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("invalid credentials", 401));
  }

  sendTokenResponse(authUser, 200, res);
});


const sendTokenResponse = (User, statusCode, res) => {
  const token = User.getJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60),
    httpOnly: true,
  };
  console.log(User.hashP)
  User.hashP = ""
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: User
    });
};





