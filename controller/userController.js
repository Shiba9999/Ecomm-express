const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");
const CustomError = require("../utils/customError");
const fileUpload = require("express-fileupload");
const cloudinanry = require("cloudinary");
const crypto = require("crypto");

exports.signup = async (req, res, next) => {
  let result;

  if (req.files) {
    let file = req.files.photo;
    result = await cloudinanry.v2.uploader.upload(file.tempFilePath, {
      folder: "users",
      width: 150,
      crop: "scale",
    });
  }

  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return next(
        new CustomError("Name , email and password are required", 400)
      );
    }
    const user = await User.create({
      name,
      email,
      password,
      photo: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
    });
    cookieToken(user, res, result);
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new CustomError("Email and password are required", 400));
    }
    //get user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    //match the password
    const isMatch = await user.isValidatePassword(password);
    if (!isMatch) {
      return next(new CustomError("Incorrect password", 401));
    }
    cookieToken(user, res);
    next();
  } catch (err) {
    console.log(err);
  }
};
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      succes: true,
      message: "you have succesfully logout ",
    });
    next();
  } catch (err) {
    console.log(err);
  }
};
exports.passwordReset = async (req, res, next) => {
  const token = req.params.token;
  const encryToken = crypto.createHash("sha256").update(token).digest("hex");
  const user =await User.findOne({encryToken,
    forgotPasswordExpiry:{$gt:Date.now()}
  })
  if(!user){
    return next(new CustomError("token is invalid or exppired",400))
  }
  if(req.body.password !== req.body.confirmPassword){
    return next (new CustomError("password and confirm password do not match",400))
  }
  user.password = req.body.password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();
  cookieToken(user,res);
  next();

};
