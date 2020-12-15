const mongoose = require("mongoose");
const schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const geocoder = require('../../common/functions/geocoder')
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
    otp: {
      type: String,
      required: true,
      unique: true,
    },
    lastOtpTimeStamp: {
      type: Date,
      default: Date.now
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
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    personalSettings: {
      shareLocation: {
        type: Boolean,
        default: false
      },
      shareContacts: {
        type: Boolean,
        default: false
      },
      receivedEmail: {
        type: Boolean,
        default: false
      }
    },
    presentLocation: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
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
