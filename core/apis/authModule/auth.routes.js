const express = require("express");
const router = express.Router();

const { personalSettings, getUserById, updateUser, accountSignIn, createAnAccount } = require("./auth.controller");
const { protect } = require("../../common/authMiddleware/auth");


router.route("/").post(accountSignIn)
router.route("/createAccount").post(createAnAccount);
module.exports = router;
