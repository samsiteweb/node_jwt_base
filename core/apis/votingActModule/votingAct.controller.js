const User = require("./votingAct.model");
const asyncHandler = require("../../common/asyncHandler/async");
const ErrorResponse = require("../../common/errorHanderMiddleware/errorResponse");
const { successResponse, failResponse } = require("../../common/responseHandler/response");
const { getQrCode } = require("../../common/functions/universal");
const { RADIUS } = require("../../common/functions/universal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("express");
const axios = require("axios");


exports.getVotingStatus = asyncHandler(async (req, res) => {



  successResponse(res, '', 'Account Creation Successful')

})
