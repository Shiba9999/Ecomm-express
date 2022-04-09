const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({
  name: {
    type: String,
    default: null,
    required: [true, "please provide a name"],
    maxlength: [40, "name should be under 40 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide an email"],
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [6, "password should be atleast 6 characters"],
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
      // required: [true, "please provide a photo id"],
    },
    secure_url: {
      type: String,
      // required: [true, "please provide a secure url"],
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//validate the passeord with passed on user password
userSchema.methods.isValidatePassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

//create and return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generate forgot password token
userSchema.methods.generateForgotPasswordToken = function () {
  //generate a long random string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  //getting a hash-make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");
    //time of token
  this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;
  return forgotToken;
};

//this user is the name of mongodb db mongo by default created with users name by plural
module.exports = mongoose.model("user", userSchema);
