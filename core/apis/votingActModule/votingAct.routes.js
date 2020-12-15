const express = require("express");
const router = express.Router();

const { getVotingStatus } = require("./auth.controller");
const { protect } = require("../../common/authMiddleware/auth");


router.route("/getVotingStatus").post(getVotingStatus);


module.exports = router;
