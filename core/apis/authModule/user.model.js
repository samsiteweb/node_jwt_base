const mongoose = require("mongoose");
const schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new schema(
  {
    fName: {
      type: String,
      default: null,
    },
    lName: {
      type: String,
      default: null,
    },
    mobile: {
      type: String,
      unique: true,
      default: null,
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    dob: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "User's email is invalid"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    channel: {
      type: String,
      enum: ["Web", "Mobile"],
      default: "Web",
    },
    imgUrl: {
      type: String,
    },
    address: {
      type: String,
      default: null
    },
    regDate: {
      type: Date,
      default: Date.now(),
    },
    regDatex: {
      type: String,
      default: Date.now(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isSynced: {
      type: Boolean,
      default: false,
    },
    about: {
      type: String,
    },
    xroles: {
      type: String,
      enum: ["user", "publisher", "admin", "superAdmin"],
      default: "user",
    },
    hashP: {
      type: String,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: String,
      default: "self",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Match user password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.hashP);
};

userSchema.pre("save", async function (next) {
  this.email = this.email.toLowerCase();
  const salt = await bcrypt.genSalt(10);
  this.hashP = await bcrypt.hash(this.hashP, salt);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { user: `${this.email}` },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

module.exports = mongoose.model("User", userSchema);
